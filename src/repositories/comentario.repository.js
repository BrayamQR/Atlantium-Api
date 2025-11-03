import ComentarioModel from "../models/comentario.model.js";

export const create = async (data) => {
  return await ComentarioModel.create(data);
};

export const bulkCreate = async (comentarios = []) => {
  if (!Array.isArray(comentarios) || comentarios.length === 0) {
    return [];
  }

  return await ComentarioModel.bulkCreate(comentarios);
};

export const get = async (id) => {
  return await ComentarioModel.findAll({
    where: { idTramite: id, vigenciaComentario: true },
    include: [
      {
        model: UsuarioModel,
        where: { vigenciaUsuario: true },
        required: false,
        as: "usuario",
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
  });
};
