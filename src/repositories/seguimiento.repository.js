import SeguimientoModel from "../models/seguimiento.model.js";

export const create = async (data) => {
  return await SeguimientoModel.create(data);
};
