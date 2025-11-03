import * as SolicitudService from "../services/solicitud.service.js";
import { handleControllerError } from "../utils/errors.js";

export const create = async (req, res) => {
  try {
    const archivo = req.files;
    const solicitud = await SolicitudService.create(req.body, archivo);
    res.status(201).json(solicitud);
  } catch (error) {
    handleControllerError(res, error);
  }
};
