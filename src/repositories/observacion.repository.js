import ObservacionModel from "../models/observacion.model.js";

export const create = async (data) => {
  return await ObservacionModel.create(data);
};
