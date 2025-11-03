import * as SolicitudRepository from "../repositories/solicitud.repository.js";
import * as ArchivoRepository from "../repositories/archivo.repository.js";
import sequelize from "../config/db.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import stringFormat from "../utils/stringFormat.js";
import { saveArchivoToDisk, deleteArchivoFromDisk } from "../config/multer.js";
import SolicitudDTO from "../dtos/solicitud.dto.js";

export const create = async (data, archivosData = []) => {
  const transaction = await sequelize.transaction();
  let archivosGuardados = [];

  try {
    data = sanitizeData(data);

    if (data.asuntoSolicitud)
      data.asuntoSolicitud = stringFormat.capitalizeSentence(
        data.asuntoSolicitud
      );
    if (data.descSolicitud)
      data.descSolicitud = stringFormat.capitalizeSentence(data.descSolicitud);
    if (data.idTramite) data.idTramite = parseInt(data.idTramite, 10);
    if (data.idUsuario) data.idUsuario = parseInt(data.idUsuario, 10);

    const solicitudData = {
      asuntoSolicitud: data.asuntoSolicitud,
      descSolicitud: data.descSolicitud,
      idTramite: data.idTramite,
      idUsuario: data.idUsuario,
    };

    const solicitud = await SolicitudRepository.create(solicitudData, {
      transaction,
    });

    if (archivosData.length > 0) {
      const archivosList = archivosData.map((archivo) => {
        const archivoGuardado = saveArchivoToDisk(archivo);
        archivosGuardados.push(archivoGuardado);

        return {
          nombreArchivo: archivoGuardado.nombreArchivo,
          rutaArchivo: archivoGuardado.rutaArchivo,
          idSolicitud: solicitud.idSolicitud,
        };
      });

      await ArchivoRepository.bulkCreate(archivosList, { transaction });
    }
    await transaction.commit();
    return new SolicitudDTO(solicitud);
  } catch (error) {
    await transaction.rollback();
    for (const a of archivosGuardados) {
      deleteArchivoFromDisk(a.rutaArchivo);
    }

    throw error;
  }
};
