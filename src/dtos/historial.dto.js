class HistorialDTO {
  constructor({ tipoEvento, descripcion, fecha, usuario }) {
    this.tipoEvento = tipoEvento;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.usuario = usuario;
  }
}

export default HistorialDTO;
