/**
 * Convierte el texto de forma automática:
 * - Si tiene una sola palabra: capitaliza solo la primera letra.
 * - Si tiene varias palabras: capitaliza la primera letra de cada palabra.
 * Ejemplo:
 *   "aDMIN" → "Admin"
 *   "aDMIN general del SISTEMA" → "Admin General Del Sistema"
 */
function capitalizeAuto(text) {
  if (!text) return "";
  text = text.toString().trim().toLowerCase();

  const words = text.split(/\s+/);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Convierte solo la primera letra de todo el texto a mayúscula,
 * dejando el resto en minúscula.
 * Ejemplo:
 *   "hOLA MUNDO desde NODE" → "Hola mundo desde node"
 */
function capitalizeSentence(text) {
  if (!text) return "";
  text = text.toString().trim().toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convierte todo el texto a minúsculas.
 * Ejemplo: "ADMIN" → "admin"
 */
function toLowerCaseText(text) {
  return text ? text.toString().toLowerCase() : "";
}

/**
 * Convierte todo el texto a mayúsculas.
 * Ejemplo: "admin general" → "ADMIN GENERAL"
 */
function toUpperCaseText(text) {
  return text ? text.toString().toUpperCase() : "";
}

/**
 * Convierte el texto en un formato apto para nombres de variables:
 * - Elimina tildes (á → a, é → e, etc.)
 * - Elimina espacios y cualquier carácter que no sea letra o número
 * - Capitaliza cada palabra (como capitalizeAuto)
 * Ejemplo:
 *   "en revisión." → "EnRevision"
 *   "pago.aprobado" → "PagoAprobado"
 */
function sanitizeAndCapitalizeVar(text) {
  if (!text) return "";
  text = text
    .toString()
    .trim()
    .normalize("NFD") // separa los acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[^a-zA-Z0-9\s]/g, "") // elimina caracteres que no sean letras, números o espacios
    .toLowerCase();

  const words = text.split(/\s+/);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

export default {
  capitalizeAuto,
  capitalizeSentence,
  toLowerCaseText,
  toUpperCaseText,
  sanitizeAndCapitalizeVar,
};
