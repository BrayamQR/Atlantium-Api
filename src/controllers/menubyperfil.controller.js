import * as MenuByPerfilService from "../services/menubyperfil.service.js";
import { handleControllerError } from "../utils/errors.js";

export const upsert = async (req, res) => {
  try {
    const data = req.body;
    const resultado = await MenuByPerfilService.upsertMenuByPerfil(data);
    res.status(200).json(resultado);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const menuByPerfil = await MenuByPerfilService.get(Number(id));
    res.status(200).json(menuByPerfil);
  } catch (error) {
    handleControllerError(res, error);
  }
};
