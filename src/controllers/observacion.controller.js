import * as ObservacionService from "../services/observacion.service.js";
import { handleControllerError } from "../utils/errors.js";

export const create = async (req, res) => {
  try {
    const observacion = await ObservacionService.create(req.body);
    res.status(201).json(observacion);
  } catch (error) {
    handleControllerError(res, error);
  }
};
