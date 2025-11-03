import { Router } from "express";
import { body, param } from "express-validator";
import * as TramiteController from "../controllers/tramite.controller.js";
import { handleErrors } from "../middlewares/validate.js";
import { uploadArchivosMemory } from "../config/multer.js";

const router = Router();

router.post(
  "/",
  uploadArchivosMemory.array("archivos", 10),
  body("tipoTramite")
    .notEmpty()
    .withMessage("El Tipo de tramite es obligatorio"),
  body("idUsuario").notEmpty().withMessage("El usuario es obligatorio"),
  body("descTramite").notEmpty().withMessage("La descripcion es obligatoria"),
  body("comentarios")
    .optional()
    .custom((value) => {
      if (!value) return true;
      try {
        const comentarios =
          typeof value === "string" ? JSON.parse(value) : value;
        if (!Array.isArray(comentarios)) throw new Error();
        return true;
      } catch (e) {
        throw new Error("Comentarios debe ser un array válido");
      }
    }),
  handleErrors,
  TramiteController.create
);

router.get(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  TramiteController.listTramitesByUsuario
);

router.get(
  "/:id/info",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  TramiteController.get
);

router.put(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  TramiteController.update
);

router.get(
  "/:id/history",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  TramiteController.historialCambios
);

router.get(
  "/:id/professional",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  TramiteController.findByEncargado
);

router.delete(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  TramiteController.remove
);

export default router;
