import UsuarioDTO from "./usuario.dto.js";

class ObservacionDTO {
  constructor({
    idObservacion,
    descObservacion,
    idTramite,
    idEstado,
    usuario,
    fechaCreacion,
    vigenciaObservacion,
  }) {
    this.idObservacion = idObservacion;
    this.descObservacion = descObservacion;
    this.idTramite = idTramite;
    this.idEstado = idEstado;
    this.usuario = usuario ? new UsuarioDTO(usuario) : null;
    this.fechaCreacion = fechaCreacion;
    this.vigenciaObservacion = vigenciaObservacion;
  }
}
export default ObservacionDTO;
