import * as MenuByPerfilRepository from "../repositories/menubyperfil.repository.js";
import MenuByPerfilDTO from "../dtos/menubyperfil.dto.js";

/**
 * Registrar permisos (requiere el idMenu, activarPermiso y idPerfil)
 * @param {{
 *    idMenu: id,
 *    idPerfil: id
 *    activarPermiso: boolean
 * }} data
 * @returns {Promise<MenuByPerfilDTO>}
 */

export const upsertMenuByPerfil = async (data) => {
  const resultado = [];
  for (const item of data) {
    let { idMenu, idPerfil, activarPermiso } = item;

    const existing = await MenuByPerfilRepository.findByMenuAndPerfil(
      idMenu,
      idPerfil
    );

    if (existing) {
      if (
        existing.vigenciaMenuByPerfil === false ||
        existing.activarPermiso !== activarPermiso
      ) {
        existing.vigenciaMenuByPerfil = true;
        existing.activarPermiso = activarPermiso;
        await existing.save();
      }
      resultado.push(new MenuByPerfilDTO(existing));
    } else if (activarPermiso) {
      const newMenu = await MenuByPerfilRepository.create({
        idMenu,
        idPerfil,
      });
      resultado.push(new MenuByPerfilDTO(newMenu));
    }
  }

  return resultado;
};

/**
 * Obtiene los permisos por perfil
 * @param {number} id - ID del perfil
 * @returns {Promise<MenuByPerfilDTO|null>}
 */

export const get = async (id) => {
  if (id === 0) id = null;
  const menuByPerfilList = await MenuByPerfilRepository.findByPerfil(id);
  return menuByPerfilList.map((item) => new MenuByPerfilDTO(item));
};
