import * as ArchivoRepository from "../repositories/archivo.repository.js";
import * as TramiteRepository from "../repositories/tramite.repository.js";
import ArchivoDTO from "../dtos/archivo.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import { saveArchivoToDisk, deleteArchivoFromDisk } from "../config/multer.js";
import sequelize from "../config/db.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import stringFormat from "../utils/stringFormat.js";

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

export const createPortafolio = async (data, portafolio) => {
  const transaction = await sequelize.transaction();
  let archivoGuardado = null;

  try {
    data = sanitizeData(data);
    data.idPersonaNatural = parseInt(data.idPersonaNatural, 10);

    if (portafolio) {
      archivoGuardado = saveArchivoToDisk(portafolio);

      const archivoData = {
        nombreArchivo: archivoGuardado.nombreArchivo,
        rutaArchivo: archivoGuardado.rutaArchivo,
        idPersonaNatural: data.idPersonaNatural,
      };

      await ArchivoRepository.create(archivoData, { transaction });
    }
    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    if (archivoGuardado) {
      deleteArchivoFromDisk(archivoGuardado.rutaArchivo);
    }
    throw error;
  }
};
