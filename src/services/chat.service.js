import * as ChatRepository from "../repositories/chat.repository.js";
import * as UsuarioRepository from "../repositories/usuario.repository.js";
import { saveArchivoToDisk, deleteArchivoFromDisk } from "../config/multer.js";
import * as ArchivoRepository from "../repositories/archivo.repository.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import { ChatDTO } from "../dtos/chat.dto.js";
import sequelize from "../config/db.js";

export const findAllChats = async () => {
  const chats = await ChatRepository.findAllChats();

  return chats ? chats.map((c) => new ChatDTO(c)) : null;
};

export const findChatsByUsuario = async (id) => {
  const usuario = await UsuarioRepository.get(id);
  if (!usuario) {
    throw new ValidationError(
      "Usuario no encontrado",
      ERROR_CODES.USER_NOT_FOUND
    );
  }

  const chats = await ChatRepository.findChatsByUsuario(id);

  return chats ? chats.map((chat) => new ChatDTO(chat)) : null;
};

export const remove = async (id) => {
  return await ChatRepository.removeChatById(id);
};

export const createMensaje = async (data, archivosData = []) => {
  archivosData = Array.isArray(archivosData) ? archivosData : [];
  let { idEmisor, idReceptor, mensaje } = data;
  idEmisor = Number(idEmisor);
  idReceptor = Number(idReceptor);

  if (!idEmisor || !idReceptor) {
    throw new ValidationError("Emisor o receptor no especificado");
  }

  const tieneContenido =
    (mensaje && mensaje.trim().length > 0) ||
    (archivosData && archivosData.length > 0);

  if (!tieneContenido) {
    throw new ValidationError("Debe enviar un mensaje o al menos un archivo");
  }

  const transaction = await sequelize.transaction();
  let archivosGuardados = [];

  try {
    // Buscar el chat existente de forma segura
    let chat = await ChatRepository.findChatBetweenUsuarios(
      idEmisor,
      idReceptor,
      { transaction }
    );

    if (!chat) {
      // Crear chat solo si no existe
      chat = await ChatRepository.createChat(
        { fechaCreacion: new Date() },
        { transaction }
      );

      await ChatRepository.createParticipantesBulk(
        [
          { idChat: chat.idChat, idUsuario: idEmisor },
          { idChat: chat.idChat, idUsuario: idReceptor },
        ],
        { transaction }
      );
    }

    // Crear el mensaje
    const nuevoMensaje = await ChatRepository.createMensaje(
      {
        idUsuario: idEmisor,
        idChat: chat.idChat,
        mensaje: mensaje?.trim() || null,
      },
      { transaction }
    );

    // Guardar archivos si hay
    if (archivosData.length > 0) {
      const archivosList = archivosData.map((archivo) => {
        const archivoGuardado = saveArchivoToDisk(archivo);
        archivosGuardados.push(archivoGuardado);

        return {
          nombreArchivo: archivoGuardado.nombreArchivo,
          rutaArchivo: archivoGuardado.rutaArchivo,
          idMensaje: nuevoMensaje.idMensaje,
        };
      });
      await ArchivoRepository.bulkCreate(archivosList, { transaction });
    }

    await transaction.commit();

    const chatActualizado = await ChatRepository.findChatById(chat.idChat);
    return new ChatDTO(chatActualizado);
  } catch (error) {
    if (!transaction.finished || transaction.finished !== "commit") {
      await transaction.rollback();
    }
    for (const a of archivosGuardados) {
      deleteArchivoFromDisk(a.rutaArchivo);
    }
    throw error;
  }
};

export const getChatById = async (idChat) => {
  const chat = await ChatRepository.findChatById(idChat);
  if (!chat) {
    throw new ValidationError(
      "Chat no encontrado",
      ERROR_CODES.CONVERSATION_NOT_FOUND
    );
  }

  return new ChatDTO(chat);
};

export const findChatBetweenUsuarios = async (idUsuarioA, idUsuarioB) => {
  const chat = await ChatRepository.findChatBetweenUsuarios(
    idUsuarioA,
    idUsuarioB
  );

  if (!chat) return null;

  return new ChatDTO(chat);
};

export const marcarMensajesComoLeidos = async (idChat, idUsuario) => {
  if (!idChat || !idUsuario) {
    throw new ValidationError(
      "Debe especificar chat y usuario",
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  const [actualizados] = await ChatRepository.marcarMensajesComoLeidos(
    idChat,
    idUsuario
  );

  return actualizados;
};

export const getMensajesNoLeidosPorChat = async (idChat, idUsuario) => {
  if (!idChat || !idUsuario) {
    throw new ValidationError(
      "Debe especificar idChat y idUsuario",
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  const total = await ChatRepository.getMensajesNoLeidosPorChat(
    idChat,
    idUsuario
  );
  return total;
};

/**
 * Obtener la cantidad total de mensajes no leídos para un usuario en todos sus chats
 */
export const getTotalMensajesNoLeidos = async (idUsuario) => {
  if (!idUsuario) {
    throw new ValidationError(
      "Debe especificar idUsuario",
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  const total = await ChatRepository.getTotalMensajesNoLeidos(idUsuario);
  return total;
};

export const findChatsConMensajesNoLeidos = async () => {
  const chats = await ChatRepository.findAllChats();
  if (!chats) return [];

  const chatsConNoLeidos = chats.filter((chat) =>
    chat.mensaje?.some((m) => m.vigenciaMensaje && m.estadoMensaje === false)
  );

  return chatsConNoLeidos.map((c) => new ChatDTO(c));
};
