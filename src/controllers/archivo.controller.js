import * as ArchivoService from "../services/archivo.service.js";
import { handleControllerError } from "../utils/errors.js";

export const listArchivosByProceso = async (req, res) => {
  try {
    const { id } = req.params;
    const archivos = await ArchivoService.listArchivosByProceso(id);
    res.json(archivos);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ArchivoService.remove(Number(id));
    if (!response) {
      return res
        .status(404)
        .json({ message: "Archivo no encontrado o ya eliminado" });
    }
    res.json({ message: "Archivo eliminado correctamente" });
  } catch (error) {
    handleControllerError(res, error);
  }
};
