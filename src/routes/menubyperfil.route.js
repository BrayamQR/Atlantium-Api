import { Router } from "express";
import { body } from "express-validator";
import * as MenuByPerfilController from "../controllers/menubyperfil.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.post(
  "/",
  body().isArray().withMessage("Se debe enviar un arreglo de registros"),
  body("*.idMenu")
    .notEmpty()
    .withMessage("El idMenu es obligatorio")
    .isInt({ min: 1 })
    .withMessage("idMenu debe ser un número entero positivo"),
  body("*.idPerfil").notEmpty().withMessage("El perfil es obligatorio"),
  body("*.activarPermiso")
    .optional()
    .isBoolean()
    .withMessage("activarPermiso debe ser true o false"),
  handleErrors,
  MenuByPerfilController.upsert
);

router.get("/:id", MenuByPerfilController.get);
export default router;
