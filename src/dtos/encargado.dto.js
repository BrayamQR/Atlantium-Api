import UsuarioDTO from "./usuario.dto.js";

class EncargadoDTO {
  constructor({
    idEncargado,
    idTramite,
    usuario,
    fechaCreacion,
    vigenciaEncargado,
  }) {
    this.idEncargado = idEncargado;
    this.idTramite = idTramite;
    this.usuario = usuario ? new UsuarioDTO(usuario) : null;
    this.fechaCreacion = fechaCreacion;
    this.vigenciaEncargado = vigenciaEncargado;
  }
}
export default EncargadoDTO;
