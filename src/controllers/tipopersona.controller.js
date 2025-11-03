import * as TipoPersonaService from "../services/tipopersona.service.js";
import { handleControllerError } from "../utils/errors.js";

export const listPN = async (req, res) => {
  try {
    const lstPersonas = await TipoPersonaService.listPN();
    res.json(lstPersonas);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const listPJ = async (req, res) => {
  try {
    const lstPersonas = await TipoPersonaService.listPJ();
    res.json(lstPersonas);
  } catch (error) {
    handleControllerError(res, error);
  }
};
