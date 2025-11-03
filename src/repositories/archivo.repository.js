import ArchivoModel from "../models/archivo.model.js";

export const create = async (data) => {
  return await ArchivoModel.create(data);
};

export const bulkCreate = async (data) => {
  return await ArchivoModel.bulkCreate(data);
};
export const findAllByProceso = async (id) => {
  return await ArchivoModel.findAll({
    where: { idProceso: id, vigenciaArchivo: true },
  });
};

export const update = async (idArchivo, data) => {
  return await ArchivoModel.update(data, { where: { idArchivo: idArchivo } });
};

export const get = async (id) => {
  return await ArchivoModel.findOne({
    where: {
      idArchivo: id,
      vigenciaArchivo: true,
    },
  });
};

export const remove = async (id) => {
  const archivo = await ArchivoModel.findOne({
    where: {
      idArchivo: id,
      vigenciaArchivo: true,
    },
  });

  if (!archivo) return false;

  await archivo.update({ vigenciaArchivo: false });
  return true;
};
