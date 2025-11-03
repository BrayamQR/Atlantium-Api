import stringFormat from "../utils/stringFormat.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import * as ObservacionRepository from "../repositories/observacion.repository.js";
import ObservacionDTO from "../dtos/observacion.dto.js";

export const create = async (data) => {
  data = sanitizeData(data);
  if (data.descObservacion)
    data.descObservacion = stringFormat.capitalizeSentence(
      data.descObservacion
    );
  if (data.idTramite) data.idTramite = parseInt(data.idTramite, 10);
  if (data.idUsuario) data.idUsuario = parseInt(data.idUsuario, 10);

  if (data.idEstado) {
    data.idEstado = parseInt(data.idEstado, 10);
  } else {
    data.idEstado = 1;
  }

  const observacion = await ObservacionRepository.create(data);
  return new ObservacionDTO(observacion);
};
