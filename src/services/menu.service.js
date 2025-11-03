import * as MenuRepository from "../repositories/menu.repository.js";
import MenuDTO from "../dtos/menu.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import stringFormat from "../utils/stringFormat.js";
import { sanitizeData } from "../utils/sanitizeData.js";

/**
 * Crea un nuevo menú
 * @param {{
 *  tituloMenu: string,
 *  pathMenu: string,
 *  ordenMenu: number,
 *  idMenuPadre?: number,
 *  iconDefMenu?: string,
 *  iconActMenu?: string
 * }} data
 * @returns {Promise<MenuDTO>}
 */

export const create = async (data) => {
  data = sanitizeData(data);
  if (data.tituloMenu)
    data.tituloMenu = stringFormat.capitalizeSentence(data.tituloMenu);
  if (data.pathMenu)
    data.pathMenu = stringFormat.toLowerCaseText(data.pathMenu);

  const [tituloExists, pathExists, ordenExists] = await Promise.all([
    MenuRepository.findByTitulo(data.tituloMenu),
    MenuRepository.findByPath(data.pathMenu),
    MenuRepository.findByOrden(data.ordenMenu),
  ]);

  if (tituloExists) {
    throw new ValidationError(
      "El título ya existe",
      ERROR_CODES.MENU_TITLE_EXISTS
    );
  }

  if (pathExists) {
    throw new ValidationError(
      "El path ya existe",
      ERROR_CODES.MENU_PATH_EXISTS
    );
  }

  if (ordenExists) {
    throw new ValidationError(
      "El orden ya existe",
      ERROR_CODES.MENU_ORDER_EXISTS
    );
  }

  const menu = await MenuRepository.create(data);
  return new MenuDTO(menu);
};

/**
 * Lista todos los menús en la base de datos
 * @returns {Promise<MenuDTO[]>}
 */

export const list = async () => {
  const menus = await MenuRepository.list();
  const menuDTOs = menus.map((m) => new MenuDTO(m));

  const menuMap = {};
  menuDTOs.forEach((m) => {
    menuMap[m.idMenu] = { ...m, children: [] };
  });

  const rootMenus = [];
  menuDTOs.forEach((m) => {
    if (m.idMenuPadre === 0) {
      rootMenus.push(menuMap[m.idMenu]);
    } else {
      if (menuMap[m.idMenuPadre]) {
        menuMap[m.idMenuPadre].children.push(menuMap[m.idMenu]);
      }
    }
  });

  return rootMenus;
};

export const listByPerfil = async (id) => {
  const menus = await MenuRepository.listByPerfil(id);
  const menuDTOs = menus.map((m) => new MenuDTO(m));

  const menuMap = {};

  menuDTOs.forEach((m) => {
    menuMap[m.idMenu] = { ...m, children: [] };
  });

  const rootMenus = [];
  menuDTOs.forEach((m) => {
    if (m.idMenuPadre === 0) {
      rootMenus.push(menuMap[m.idMenu]);
    } else {
      if (menuMap[m.idMenuPadre]) {
        menuMap[m.idMenuPadre].children.push(menuMap[m.idMenu]);
      }
    }
  });

  return rootMenus;
};
