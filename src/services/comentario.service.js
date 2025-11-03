import stringFormat from "../utils/stringFormat.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import * as ComentarioRepository from "../repositories/comentario.repository.js";
import ComentarioDTO from "../dtos/comentario.dto.js";

export const create = async (data) => {
  data = sanitizeData(data);
  if (data.descComentario)
    data.descComentario = stringFormat.capitalizeSentence(data.descComentario);
  if (data.idTramite) data.idTramite = parseInt(data.idTramite, 10);
  data.idUsuario = parseInt(data.idUsuario, 10);

  const comentario = await ComentarioRepository.create(data);
  return new ComentarioDTO(comentario);
};
