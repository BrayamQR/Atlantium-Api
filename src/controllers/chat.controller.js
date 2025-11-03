import * as ChatService from "../services/chat.service.js";
import { handleControllerError } from "../utils/errors.js";

export const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatService.getChatById(Number(id));
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }
    res.json(chat);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const findAllChats = async (req, res) => {
  try {
    const chats = await ChatService.findAllChats();
    res.json(chats || []);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const findChatsConMensajesNoLeidos = async (req, res) => {
  try {
    const chats = await ChatService.findChatsConMensajesNoLeidos();
    res.json(chats || []);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const findChatsByUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const chats = await ChatService.findChatsByUsuario(Number(id));
    res.json(chats || []);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ChatService.remove(Number(id));
    if (!response) {
      return res
        .status(404)
        .json({ message: "Chat no encontrado o ya eliminado" });
    }
    res.json({ message: "Chat eliminado correctamente" });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const findChatBetweenUsuarios = async (req, res) => {
  try {
    const { idEmisor, idReceptor } = req.params;

    if (!idEmisor || !idReceptor) {
      return res
        .status(400)
        .json({ message: "Debe enviar idEmisor y idReceptor" });
    }

    const response = await ChatService.findChatBetweenUsuarios(
      Number(idEmisor),
      Number(idReceptor)
    );
    res.json(response);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const createMensaje = async (req, res) => {
  try {
    const archivos = req.files || [];
    const chat = await ChatService.createMensaje(req.body, archivos);

    if (!chat) return res.status(204).send();

    const io = req.app.get("io");
    io.to(`chat_${chat.idChat}`).emit("nuevo_mensaje", chat);

    const participantes = chat.participante.filter(
      (p) => p.usuario.idUsuario !== Number(req.body.idEmisor)
    );

    participantes.forEach((p) => {
      io.to(`usuario_${p.usuario.idUsuario}`).emit(
        "nuevo_mensaje_general",
        chat
      );
    });

    return res.status(201).json(chat);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const marcarMensajesComoLeidos = async (req, res) => {
  try {
    const { idChat, idUsuario } = req.body;
    if (!idChat || !idUsuario) {
      return res
        .status(400)
        .json({ message: "Debe enviar idChat y idUsuario" });
    }

    const actualizados = await ChatService.marcarMensajesComoLeidos(
      idChat,
      idUsuario
    );

    res.json({ message: `${actualizados} mensaje(s) marcados como leídos` });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const getMensajesNoLeidosPorChat = async (req, res) => {
  try {
    const { idChat, idUsuario } = req.params;

    if (!idChat || !idUsuario) {
      return res
        .status(400)
        .json({ message: "Debe enviar idChat y idUsuario" });
    }

    const total = await ChatService.getMensajesNoLeidosPorChat(
      Number(idChat),
      Number(idUsuario)
    );

    res.json({
      idChat: Number(idChat),
      idUsuario: Number(idUsuario),
      noLeidos: total,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

/**
 * Obtener la cantidad total de mensajes no leídos para un usuario en todos sus chats
 */
export const getTotalMensajesNoLeidos = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ message: "Debe enviar idUsuario" });
    }

    const total = await ChatService.getTotalMensajesNoLeidos(Number(idUsuario));

    res.json({ idUsuario: Number(idUsuario), noLeidos: total });
  } catch (error) {
    handleControllerError(res, error);
  }
};
