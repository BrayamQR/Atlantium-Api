import { Router } from "express";
import { body, param } from "express-validator";
import * as ArchivoController from "../controllers/archivo.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.get(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  ArchivoController.listArchivosByProceso
);

router.delete(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  ArchivoController.remove
);

export default router;
