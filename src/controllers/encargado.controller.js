import * as EncargadoService from "../services/encargado.service.js";
import { handleControllerError } from "../utils/errors.js";

export const insertEncargadoTramite = async (req, res) => {
  try {
    const data = req.body;
    const resultado = await EncargadoService.insertEncargadoTramite(data);
    res.status(200).json(resultado);
  } catch (error) {
    handleControllerError(res, error);
  }
};
