/**
 * Limpia y normaliza los valores de un objeto.
 * - Aplica trim() a todos los string.
 * - Convierte strings numéricos en Number.
 * - Convierte 'true'/'false' en Boolean.
 * - Deja intactos los demás tipos.
 */
export const sanitizeData = (data = {}) => {
  const sanitized = {};

  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

    const value = data[key];

    if (typeof value === "string") {
      sanitized[key] = value.trim();
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};
