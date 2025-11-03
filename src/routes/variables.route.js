import { Router } from "express";
import { body, param } from "express-validator";
import * as variablesController from "../controllers/variables.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.get(
  "/:name",
  param("name")
    .exists()
    .withMessage("El parámetro name es obligatorio")
    .isString()
    .withMessage("El parámetro name debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El parámetro name no puede estar vacío"),
  handleErrors,
  variablesController.findByName
);

export default router;
