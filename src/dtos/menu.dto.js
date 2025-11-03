class MenuDTO {
  constructor({
    idMenu,
    tituloMenu,
    pathMenu,
    ordenMenu,
    idMenuPadre,
    iconDefMenu,
    iconActMenu,
    vigenciaMenu,
    children = [],
  }) {
    this.idMenu = idMenu;
    this.tituloMenu = tituloMenu;
    this.pathMenu = pathMenu;
    this.ordenMenu = ordenMenu;
    this.idMenuPadre = idMenuPadre;
    this.iconDefMenu = iconDefMenu;
    this.iconActMenu = iconActMenu;
    this.vigenciaMenu = vigenciaMenu;
    this.children = children;
  }
}

export default MenuDTO;
