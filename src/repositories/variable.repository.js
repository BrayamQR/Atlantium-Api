import VariablesGlobalesModel from "../models/variablesglobales.model.js";

export const create = async (data) => {
  return await VariablesGlobalesModel.create(data);
};

export const findByName = async (name) => {
  return await VariablesGlobalesModel.findOne({
    where: {
      nomVariable: name,
      vigenciaVariable: true,
    },
  });
};
