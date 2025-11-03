import EtapaDTO from "./etapa.dto.js";
import UsuarioDTO from "./usuario.dto.js";

class SeguimientoDTO {
  constructor({
    idSeguimiento,
    idTramite,
    fechaRegistro,
    etapa,
    usuario,
    vigenciaSeguimiento,
  }) {
    this.idSeguimiento = idSeguimiento;
    this.idTramite = idTramite;
    this.fechaRegistro = fechaRegistro;
    this.etapa = etapa ? new EtapaDTO(etapa) : null;
    this.usuario = usuario ? new UsuarioDTO(usuario) : null;
    this.vigenciaSeguimiento = vigenciaSeguimiento;
  }
}

export default SeguimientoDTO;
