import { Router } from "express";
import { handleErrors } from "../middlewares/validate.js";
import { body, param } from "express-validator";
import * as ExternalApisController from "../controllers/externalapis.controller.js";

const router = Router();

router.get(
  "/:ruc/consulta-ruc",
  param("ruc").notEmpty().withMessage("El ruc es necesario"),
  handleErrors,
  ExternalApisController.obtenerRuc
);

router.get(
  "/:dni/consulta-dni",
  param("dni").notEmpty().withMessage("El dni es obligatorio"),
  handleErrors,
  ExternalApisController.obtenerDni
);

export default router;
