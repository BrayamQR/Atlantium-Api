export class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
  }
}

export const InternalServerError = (res, error) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  res.status(500).json({
    message:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Error interno del servidor",
  });
};

/**
 * Maneja errores en los controladores de manera estandarizada
 * @param {Response} res - objeto response de Express
 * @param {Error} error - error lanzado
 */
export const handleControllerError = (res, error) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ code: error.code, message: error.message });
  }
  InternalServerError(res, error);
};
