class MenuByPerfilDTO {
  constructor({
    idMenuByPerfil,
    idMenu,
    idPerfil,
    activarPermiso,
    vigenciaMenuByPerfil,
  }) {
    this.idMenuByPerfil = idMenuByPerfil;
    this.idMenu = idMenu;
    this.idPerfil = idPerfil;
    this.activarPermiso = activarPermiso;
    this.vigenciaMenuByPerfil = vigenciaMenuByPerfil;
  }
}

export default MenuByPerfilDTO;
