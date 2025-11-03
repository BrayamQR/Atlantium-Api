class ArchivoDTO {
  constructor({
    idArchivo,
    nombreArchivo,
    rutaArchivo,
    idTramite,
    idSolicitud,
    vigenciaArchivo,
  }) {
    this.idArchivo = idArchivo;
    this.nombreArchivo = nombreArchivo;
    this.rutaArchivo = rutaArchivo;
    this.idTramite = idTramite;
    this.idSolicitud = idSolicitud;
    this.vigenciaArchivo = vigenciaArchivo;
  }
}

export default ArchivoDTO;
