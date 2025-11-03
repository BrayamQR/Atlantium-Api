import EncargadoModel from "../models/encargado.model.js";
import UsuarioModel from "../models/usuario.model.js";

export const bulkCreate = async (data) => {
  return await EncargadoModel.bulkCreate(data);
};

export const findByTramiteAndUsuario = async (idTramite, idUsuario) => {
  return await EncargadoModel.findOne({
    where: {
      idTramite: idTramite,
      idUsuario: idUsuario,
    },
    include: [
      {
        model: UsuarioModel,
        where: { vigenciaUsuario: true },
        required: false,
        as: "usuario",
      },
    ],
  });
};

export const fingByTramite = async (id) => {
  return await EncargadoModel.findAll({
    where: {
      idTramite: id,
      vigenciaEncargado: true,
    },
    include: [
      {
        model: UsuarioModel,
        where: { vigenciaUsuario: true },
        required: false,
        as: "usuario",
      },
    ],
  });
};
