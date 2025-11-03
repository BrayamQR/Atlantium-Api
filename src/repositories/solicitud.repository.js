import SolicitudModel from "../models/solicitud.model.js";

export const create = async (data) => {
  return await SolicitudModel.create(data);
};
