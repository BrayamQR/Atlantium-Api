import MenuByPerfilModel from "../models/menubyperfil.model.js";

export const findByMenuAndPerfil = async (idMenu, idPerfil) => {
  return await MenuByPerfilModel.findOne({
    where: {
      idMenu: idMenu,
      idPerfil: idPerfil,
    },
  });
};

export const create = async (data) => {
  return await MenuByPerfilModel.create(data);
};

export const findByPerfil = async (id) => {
  return await MenuByPerfilModel.findAll({
    where: {
      idPerfil: id,
      vigenciaMenuByPerfil: true,
    },
  });
};
