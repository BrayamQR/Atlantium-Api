import PerfilModel from "../models/perfil.model.js";
import { Op } from "sequelize";

export const list = async () => {
  return PerfilModel.findAll({ where: { vigenciaPerfil: true } });
};

export const get = async (id) => {
  return PerfilModel.findOne({
    where: { idPerfil: id, vigenciaPerfil: true },
  });
};

export const findByName = async (nomPerfil) => {
  const perfil = await PerfilModel.findOne({
    where: { nomPerfil: nomPerfil, vigenciaPerfil: true },
  });

  return !!perfil;
};

export const findByNameExcludingId = async (id, nomPerfil) => {
  const perfil = await PerfilModel.findOne({
    where: {
      nomPerfil: nomPerfil,
      vigenciaPerfil: true,
      idPerfil: { [Op.ne]: id },
    },
  });

  return !!perfil;
};

export const create = async (data) => {
  return await PerfilModel.create(data);
};

export const update = async (id, data) => {
  const perfil = await PerfilModel.findOne({
    where: { idPerfil: id, vigenciaPerfil: true },
  });
  if (!perfil) return null;
  await perfil.update(data);
  return perfil;
};

export const remove = async (id) => {
  const perfil = await PerfilModel.findOne({
    where: { idPerfil: id, vigenciaPerfil: true },
  });
  if (!perfil) return false;
  await perfil.update({ vigenciaPerfil: false });
  return true;
};
