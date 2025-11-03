import { Router } from "express";
import { body } from "express-validator";
import * as EncargadoController from "../controllers/encargado.controller.js";

import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.post(
  "/",
  body().isArray().withMessage("Se debe enviar un arregle de encagados"),
  body("*.idTramite")
    .notEmpty()
    .withMessage("El idTramite es obligatorio")
    .isInt({ min: 1 })
    .withMessage("idTramite debe ser un número entero positivo"),

  body("*.idUsuario")
    .notEmpty()
    .withMessage("El idUsuario es obligatorio")
    .isInt({ min: 1 })
    .withMessage("idUsuario debe ser un número entero positivo"),
  handleErrors,
  EncargadoController.insertEncargadoTramite
);

export default router;
