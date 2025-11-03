import UsuarioDTO from "./usuario.dto.js";

class ComentarioDTO {
  constructor({
    idComentario,
    descComentario,
    idTramite,
    usuario,
    fechaCreacion,
    vigenciaComentario,
  }) {
    this.idComentario = idComentario;
    this.descComentario = descComentario;
    this.idTramite = idTramite;
    this.usuario = usuario ? new UsuarioDTO(usuario) : null;
    this.fechaCreacion = fechaCreacion;
    this.vigenciaComentario = vigenciaComentario;
  }
}

export default ComentarioDTO;
