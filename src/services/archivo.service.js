import * as ArchivoRepository from "../repositories/archivo.repository.js";
import * as TramiteRepository from "../repositories/tramite.repository.js";
import ArchivoDTO from "../dtos/archivo.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import { deleteArchivoFromDisk } from "../config/multer.js";

export const listArchivosByProceso = async (id) => {
  const tramite = await TramiteRepository.get(id);
  if (!tramite) {
    throw new ValidationError(
      "Tramite no encontrado",
      ERROR_CODES.PROCESS_NOT_FOUND
    );
  }

  const archivos = await ArchivoRepository.findAllByProceso(id);
  return archivos ? archivos.map((a) => new ArchivoDTO(a)) : null;
};

export const remove = async (id) => {
  try {
    const archivo = await ArchivoRepository.get(id);

    if (!archivo) {
      throw new ValidationError(
        "Archivo no encontrado",
        ERROR_CODES.FILE_NOT_FOUND
      );
    }
    deleteArchivoFromDisk(archivo.rutaArchivo);

    return await ArchivoRepository.remove(id);
  } catch (error) {
    console.error("Error eliminando archivo:", error);
    throw error;
  }
};
