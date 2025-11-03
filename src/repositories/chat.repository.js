import ChatModel from "../models/chat.model.js";
import MensajeModel from "../models/mensaje.model.js";
import ParticipanteModel from "../models/participante.model.js";
import UsuarioModel from "../models/usuario.model.js";
import PersonaNaturalModel from "../models/persona_natural.model.js";
import PersonaJuridicaModel from "../models/persona_juridica.model.js";
import ArchivoModel from "../models/archivo.model.js";
import { Op } from "sequelize";

export const findAllChats = async () => {
  const chats = await ChatModel.findAll({
    where: { vigenciaChat: true },
    include: [
      {
        model: ParticipanteModel,
        as: "participante",
        required: true,
        where: { vigenciaParticipante: true },
        include: [
          {
            model: UsuarioModel,
            as: "usuario",
            where: { vigenciaUsuario: true },
            required: false,
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: MensajeModel,
        as: "mensaje",
        required: false,
        where: { vigenciaMensaje: true },
        separate: true,
        order: [["fechaHora", "DESC"]],
        include: [
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivo",
          },
        ],
      },
    ],
  });

  return chats;
};

export const findChatsByUsuario = async (idUsuario) => {
  if (!idUsuario) return [];

  const chats = await ChatModel.findAll({
    where: { vigenciaChat: true },
    include: [
      {
        model: ParticipanteModel,
        as: "participante",
        required: true,
        where: { vigenciaParticipante: true },
        include: [
          {
            model: UsuarioModel,
            as: "usuario",
            where: { vigenciaUsuario: true },
            required: false,
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: MensajeModel,
        as: "mensaje",
        required: false,
        where: { vigenciaMensaje: true },
        separate: true,
        order: [["fechaHora", "DESC"]],
        include: [
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivo",
          },
        ],
      },
    ],
  });

  const chatsUsuario = chats.filter((chat) =>
    chat.participante.some((p) => p.idUsuario === idUsuario)
  );

  chatsUsuario.sort((a, b) => {
    const fechaA =
      a.mensaje.length > 0
        ? new Date(a.mensaje[a.mensaje.length - 1].fechaHora)
        : new Date(a.fechaCreacion);
    const fechaB =
      b.mensaje.length > 0
        ? new Date(b.mensaje[b.mensaje.length - 1].fechaHora)
        : new Date(b.fechaCreacion);

    return fechaB - fechaA;
  });

  return chatsUsuario;
};

export const findChatById = async (idChat) => {
  if (!idChat) return null;

  const chat = await ChatModel.findOne({
    where: { idChat, vigenciaChat: true },
    include: [
      {
        model: ParticipanteModel,
        as: "participante",
        required: true,
        where: { vigenciaParticipante: true },
        include: [
          {
            model: UsuarioModel,
            as: "usuario",
            where: { vigenciaUsuario: true },
            required: true,
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: MensajeModel,
        as: "mensaje",
        required: false,
        where: { vigenciaMensaje: true },
        order: [["fechaHora", "DESC"]],
        include: [
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivo",
          },
        ],
      },
    ],
  });

  return chat;
};

export const createMensaje = async (data) => {
  return await MensajeModel.create(data);
};

export const createChat = async (data) => {
  return await ChatModel.create(data);
};

export const createParticipantesBulk = async (participantes) => {
  return await ParticipanteModel.bulkCreate(participantes);
};

export const removeChatById = async (idChat) => {
  const transaction = await sequelize.transaction();
  try {
    await ChatModel.update(
      { vigenciaChat: false },
      { where: { idChat }, transaction }
    );

    await ParticipanteModel.update(
      { vigenciaParticipante: false },
      { where: { idChat }, transaction }
    );

    await MensajeModel.update(
      { vigenciaMensaje: false },
      { where: { idChat }, transaction }
    );

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar chat:", error);
    throw error;
  }
};
export const findChatBetweenUsuarios = async (idUsuarioA, idUsuarioB) => {
  if (!idUsuarioA || !idUsuarioB) return null;

  const chats = await ChatModel.findAll({
    where: { vigenciaChat: true },
    include: [
      {
        model: ParticipanteModel,
        as: "participante",
        required: true,
        where: {
          vigenciaParticipante: true,
          idUsuario: [idUsuarioA, idUsuarioB],
        },
        include: [
          {
            model: UsuarioModel,
            as: "usuario",
            where: { vigenciaUsuario: true },
            required: true,
          },
        ],
      },
    ],
  });
  const chat = chats.find(
    (c) =>
      c.participante.length === 2 &&
      c.participante.some((p) => p.idUsuario === idUsuarioA) &&
      c.participante.some((p) => p.idUsuario === idUsuarioB)
  );
  return chat || null;
};

export const marcarMensajesComoLeidos = async (idChat, idUsuario) => {
  return await MensajeModel.update(
    { estadoMensaje: true },
    {
      where: {
        idChat,
        idUsuario: { [Op.ne]: idUsuario },
        estadoMensaje: false,
        vigenciaMensaje: true,
      },
    }
  );
};

export const findMensajeById = async (id) => {
  if (!id) return null;

  return await MensajeModel.findOne({
    where: { idMensaje: id, vigenciaMensaje: true },
    include: [
      {
        model: ArchivoModel,
        as: "archivo",
        required: false,
        where: { vigenciaArchivo: true },
      },
    ],
  });
};

export const getTotalMensajesNoLeidos = async (idUsuario) => {
  // Primero obtener todos los chats donde participa el usuario
  const chats = await ParticipanteModel.findAll({
    where: { idUsuario, vigenciaParticipante: true },
    attributes: ["idChat"],
  });
  const chatIds = chats.map((c) => c.idChat);

  return await MensajeModel.count({
    where: {
      idChat: chatIds,
      idUsuario: { [Op.ne]: idUsuario }, // mensajes de otros
      estadoMensaje: false,
      vigenciaMensaje: true,
    },
  });
};

export const getMensajesNoLeidosPorChat = async (idChat, idUsuario) => {
  return await MensajeModel.count({
    where: {
      idChat,
      idUsuario: { [Op.ne]: idUsuario }, // solo los mensajes de otros usuarios
      estadoMensaje: false,
      vigenciaMensaje: true,
    },
  });
};
