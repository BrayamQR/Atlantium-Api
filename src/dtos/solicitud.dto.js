import UsuarioDTO from "./usuario.dto.js";
import ArchivoDTO from "./archivo.dto.js";

class SolicitudDTO {
  constructor({
    idSolicitud,
    asuntoSolicitud,
    descSolicitud,
    fechaEmision,
    idTramite,
    usuario,
    archivos,
    vigenciaSolicitud,
  }) {
    this.idSolicitud = idSolicitud;
    this.asuntoSolicitud = asuntoSolicitud;
    this.descSolicitud = descSolicitud;
    this.fechaEmision = fechaEmision;
    this.idTramite = idTramite;
    this.usuario = usuario ? new UsuarioDTO(usuario) : null;
    this.archivos = Array.isArray(archivos)
      ? archivos.map((a) => new ArchivoDTO(a))
      : [];
    this.vigenciaSolicitud = vigenciaSolicitud;
  }
}

export default SolicitudDTO;
