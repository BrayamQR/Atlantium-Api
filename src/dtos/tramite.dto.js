import UsuarioDTO from "./usuario.dto.js";
import ArchivoDTO from "./archivo.dto.js";
import EtapaDTO from "./etapa.dto.js";
import EncargadoDTO from "./encargado.dto.js";
import ComentarioDTO from "./comentario.dto.js";
import ObservacionDTO from "./observacion.dto.js";
import Pago from "./pago.dto.js";
import SolicitudDTO from "./solicitud.dto.js";
import SeguimientoDTO from "./seguimiento.dto.js";

class TramiteDTO {
  constructor({
    idTramite,
    codTramite,
    tipoTramite,
    descTramite,
    fechaEmision,
    fechaLimite,
    usuario,
    archivos,
    etapa,
    encargado,
    comentario,
    observacion,
    pago,
    solicitud,
    seguimiento,
    vigenciaTramite,
  }) {
    this.idTramite = idTramite;
    this.codTramite = codTramite;
    this.tipoTramite = tipoTramite;
    this.descTramite = descTramite;
    this.fechaEmision = fechaEmision;
    this.fechaLimite = fechaLimite;
    this.usuario = usuario ? new UsuarioDTO(usuario) : null;
    this.archivos = Array.isArray(archivos)
      ? archivos.map((a) => new ArchivoDTO(a))
      : [];
    this.etapa = etapa ? new EtapaDTO(etapa) : null;
    this.encargado = Array.isArray(encargado)
      ? encargado.map((e) => new EncargadoDTO(e))
      : [];
    this.comentario = Array.isArray(comentario)
      ? comentario.map((c) => new ComentarioDTO(c))
      : [];
    this.observacion = Array.isArray(observacion)
      ? observacion.map((o) => new ObservacionDTO(o))
      : [];
    this.pago = pago ? new Pago.PagoDTO(pago) : null;
    this.solicitud = Array.isArray(solicitud)
      ? solicitud.map((s) => new SolicitudDTO(s))
      : [];

    this.seguimiento = Array.isArray(seguimiento)
      ? seguimiento.map((s) => new SeguimientoDTO(s))
      : [];
    this.vigenciaTramite = vigenciaTramite;
  }
}

export default TramiteDTO;
