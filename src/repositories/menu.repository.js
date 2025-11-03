import MenuModel from "../models/menu.model.js";
import MenuByPerfilModel from "../models/menubyperfil.model.js";

export const findByTitulo = async (tituloMenu) => {
  const menu = await MenuModel.findOne({
    where: { tituloMenu: tituloMenu, vigenciaMenu: true },
  });

  return !!menu;
};

export const findByPath = async (pathMenu) => {
  const menu = await MenuModel.findOne({
    where: { pathMenu: pathMenu, vigenciaMenu: true },
  });

  return !!menu;
};
export const findByOrden = async (ordenMenu) => {
  const menu = await MenuModel.findOne({
    where: { ordenMenu: ordenMenu, vigenciaMenu: true },
  });

  return !!menu;
};

export const create = async (data) => {
  return await MenuModel.create(data);
};

export const list = async () => {
  return MenuModel.findAll({
    where: { vigenciaMenu: true },
    order: [["ordenMenu", "ASC"]],
  });
};

export const listByPerfil = async (id) => {
  return MenuModel.findAll({
    where: { vigenciaMenu: true },
    include: [
      {
        model: MenuByPerfilModel,
        required: true,
        where: {
          vigenciaMenuByPerfil: true,
          idPerfil: id,
        },
      },
    ],
    order: [["ordenMenu", "ASC"]],
  });
};
