import * as ExternalApisService from "../services/externalapis.service.js";
import { handleControllerError } from "../utils/errors.js";

export const obtenerRuc = async (req, res) => {
  const { ruc } = req.params;

  try {
    const data = await ExternalApisService.consultaRUC(ruc);
    return res.json(data);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const obtenerDni = async (req, res) => {
  const { dni } = req.params;

  try {
    const data = await ExternalApisService.consultaDNI(dni);
    return res.json(data);
  } catch (error) {
    handleControllerError(res, error);
  }
};
