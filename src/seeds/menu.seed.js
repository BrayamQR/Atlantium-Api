import MenuModel from "../models/menu.model.js";

export const seedMenu = async () => {
  const menus = [
    {
      tituloMenu: "Dashboard",
      pathMenu: "home",
      ordenMenu: 1,
      idMenuPadre: 0,
      iconDefMenu: "bi bi-house-door",
      iconActMenu: "bi bi-house-door-fill",
    },
    {
      tituloMenu: "Trámites",
      pathMenu: "tramites",
      ordenMenu: 2,
      idMenuPadre: 0,
      iconDefMenu: "bi bi-file-earmark-richtext",
      iconActMenu: "bi bi-file-earmark-richtext-fill",
    },
    {
      tituloMenu: "Asignaciones",
      pathMenu: "asignaciones",
      ordenMenu: 3,
      idMenuPadre: 0,
      iconDefMenu: "bi bi-file-earmark-text",
      iconActMenu: "bi bi-file-earmark-text-fill",
    },
    {
      tituloMenu: "Seguimiento",
      pathMenu: "seguimiento",
      ordenMenu: 4,
      idMenuPadre: 0,
      iconDefMenu: "bi bi-graph-up-arrow",
      iconActMenu: "bi bi-graph-up-arrow",
    },
    {
      tituloMenu: "Pagos",
      pathMenu: "pagos",
      ordenMenu: 5,
      idMenuPadre: 0,
      iconDefMenu: "bi bi-credit-card",
      iconActMenu: "bi bi-credit-card-fill",
    },
    {
      tituloMenu: "Chat",
      pathMenu: "chat",
      ordenMenu: 6,
      idMenuPadre: 0,
      iconDefMenu: "bi bi-chat-dots",
      iconActMenu: "bi bi-chat-dots-fill",
    },
    {
      tituloMenu: "Administración",
      pathMenu: "administracion",
      ordenMenu: 7,
      idMenuPadre: 0,
      iconDefMenu: "bi bi-gear",
      iconActMenu: "bi bi-gear-fill",
    },
  ];

  for (const menu of menus) {
    await MenuModel.findOrCreate({
      where: {
        tituloMenu: menu.tituloMenu,
        pathMenu: menu.pathMenu,
        ordenMenu: menu.ordenMenu,
      },
      defaults: { ...menu },
    });
  }
};
