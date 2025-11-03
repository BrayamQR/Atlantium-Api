class PerfilDTO {
  constructor({
    idPerfil,
    nomPerfil,
    descPerfil,
    fechaCreacion,
    estadoPerfil,
    vigenciaPerfil,
  }) {
    this.idPerfil = idPerfil;
    this.nomPerfil = nomPerfil;
    this.descPerfil = descPerfil;
    this.fechaCreacion = fechaCreacion;
    this.estadoPerfil = estadoPerfil;
    this.vigenciaPerfil = vigenciaPerfil;
  }
}

export default PerfilDTO;
