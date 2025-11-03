import UsuarioDTO from "./usuario.dto.js";
import EtapaDTO from "./etapa.dto.js";

class EstadoPagoDTO {
  constructor({ idEstadoPago, nomEstadoPago, descEstadoPago }) {
    this.idEstadoPago = idEstadoPago;
    this.nomEstadoPago = nomEstadoPago;
    this.descEstadoPago = descEstadoPago;
  }
}

class PagoDTO {
  constructor({
    idPago,
    idTramite,
    idUsuario,
    estadoPago,
    montoPago,
    descPago,
    fechaCreacion,
    fechaPago,
    mpPaymentId,
    mpStatus,
    mpPaymentMethod,
    mpRawResponse,
    vigenciaPago,
  }) {
    this.idPago = idPago;
    this.idTramite = idTramite;
    this.idUsuario = idUsuario;
    this.estadoPago = estadoPago ? new EstadoPagoDTO(estadoPago) : null;
    this.montoPago = montoPago;
    this.descPago = descPago;
    this.fechaCreacion = fechaCreacion;
    this.fechaPago = fechaPago;
    this.mpPaymentId = mpPaymentId;
    this.mpStatus = mpStatus;
    this.mpPaymentMethod = mpPaymentMethod;
    this.mpRawResponse = mpRawResponse;
    this.vigenciaPago = vigenciaPago;
  }
}

class TramitesByPagoDTO {
  constructor({
    idTramite,
    tipoTramite,
    descTramite,
    fechaEmision,
    fechaLimite,
    usuario,
    etapa,
    pago,
    vigenciaTramite,
  }) {
    this.idTramite = idTramite;
    this.tipoTramite = tipoTramite;
    this.descTramite = descTramite;
    this.fechaEmision = fechaEmision;
    this.fechaLimite = fechaLimite;
    this.usuario = usuario ? new UsuarioDTO(usuario) : null;
    this.etapa = etapa ? new EtapaDTO(etapa) : null;
    this.pago = pago ? new PagoDTO(pago) : null;
    this.vigenciaTramite = vigenciaTramite;
  }
}

export default { PagoDTO, TramitesByPagoDTO, EstadoPagoDTO };
