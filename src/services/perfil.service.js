import * as PerfilRepository from "../repositories/perfil.repository.js";
import PerfilDTO from "../dtos/perfil.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import * as VariablesGlobalesRepostitory from "../repositories/variable.repository.js";
import stringFormat from "../utils/stringFormat.js";
import { sanitizeData } from "../utils/sanitizeData.js";

/**
 * Lista todos los perfiles en la base de datos
 * @returns {Promise<PerfilDTO[]>}
 */

export const list = async () => {
  const perfiles = await PerfilRepository.list();
  return perfiles.map((p) => new PerfilDTO(p));
};

/**
 * Obtiene un perfil por su ID
 * @param {number} id - ID del perfil
 * @returns {Promise<PerfilDTO|null>}
 */

export const get = async (id) => {
  const perfil = await PerfilRepository.get(id);
  return perfil ? new PerfilDTO(perfil) : null;
};

/**
 * Crea un nuevo perfil (solo requiere nombre)
 * @param {{ nomPerfil: string }} data
 * @returns {Promise<PerfilDTO>}
 */

export const create = async (data) => {
  data = sanitizeData(data);
  if (data.nomPerfil)
    data.nomPerfil = stringFormat.capitalizeAuto(data.nomPerfil);
  if (data.descPerfil)
    data.descPerfil = stringFormat.capitalizeSentence(data.descPerfil);

  const exists = await PerfilRepository.findByName(data.nomPerfil);
  if (exists) {
    throw new ValidationError(
      "El perfil ya esta registrado",
      ERROR_CODES.PROFILE_EXISTS
    );
  }

  const perfil = await PerfilRepository.create(data);

  const nombreVar = "var" + stringFormat.capitalizeAuto(perfil.nomPerfil);
  const varExistente = await VariablesGlobalesRepostitory.findByName(nombreVar);

  if (!varExistente) {
    await VariablesGlobalesRepostitory.create({
      nomVariable: nombreVar,
      valorVariable: perfil.idPerfil.toString(),
      tipoVariable: "int",
      descVariable: `Variable global para el perfil ${perfil.nomPerfil}`,
    });
  } else {
    console.log(
      `⚠️ La variable global '${nombreVar}' ya existe, no se insertó.`
    );
  }

  return new PerfilDTO(perfil);
};

/**
 * Actualiza el nombre de un perfil
 * @param {number} id
 * @param {{ nomPerfil: string }} data
 * @returns {Promise<PerfilDTO|null>}
 */

export const update = async (id, data) => {
  data = sanitizeData(data);
  if (data.nomPerfil)
    data.nomPerfil = stringFormat.capitalizeAuto(data.nomPerfil);

  const exists = await PerfilRepository.findByNameExcludingId(
    id,
    data.nomPerfil
  );
  if (exists) {
    throw new ValidationError(
      "El perfil ya esta registrado",
      ERROR_CODES.PROFILE_EXISTS
    );
  }

  const perfil = await PerfilRepository.update(id, data);
  return perfil ? new PerfilDTO(perfil) : null;
};

/**
 * Elimina lógicamente un perfil (vigenciaPerfil = false)
 * @param {number} id
 * @returns {Promise<boolean>} true si se eliminó, false si no existe
 */

export const remove = async (id) => {
  return await PerfilRepository.remove(id);
};

/**
 * Cambia el estado de un perfil (activo/inactivo)
 * @param {number} id - ID del perfil
 * @returns {Promise<PerfilDTO|null>}
 */

export const toggleEstado = async (id) => {
  const perfil = await PerfilRepository.get(id);
  if (!perfil) return null;

  const nuevoEstado = !perfil.estadoPerfil;
  const actualizado = await PerfilRepository.update(id, {
    estadoPerfil: nuevoEstado,
  });
  return new PerfilDTO(actualizado);
};
