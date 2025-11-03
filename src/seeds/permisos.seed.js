import MenuByPerfilModel from "../models/menubyperfil.model.js";

export const seedMenuByPerfil = async () => {
  const permisos = [
    {
      idPerfil: 1,
      idMenu: 1,
    },
    {
      idPerfil: 1,
      idMenu: 2,
    },
    {
      idPerfil: 1,
      idMenu: 3,
    },
    {
      idPerfil: 1,
      idMenu: 4,
    },
    {
      idPerfil: 1,
      idMenu: 5,
    },
    {
      idPerfil: 1,
      idMenu: 6,
    },
    {
      idPerfil: 1,
      idMenu: 7,
    },
  ];

  for (const permiso of permisos) {
    await MenuByPerfilModel.findOrCreate({
      where: {
        idPerfil: permiso.idPerfil,
        idMenu: permiso.idMenu,
      },
      defaults: { ...permiso },
    });
  }
};
