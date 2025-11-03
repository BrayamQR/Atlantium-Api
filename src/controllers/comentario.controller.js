import * as ComentarioService from "../services/comentario.service.js";
import { handleControllerError } from "../utils/errors.js";

export const create = async (req, res) => {
  try {
    const comentario = await ComentarioService.create(req.body);
    res.status(201).json(comentario);
  } catch (error) {
    handleControllerError(res, error);
  }
};
