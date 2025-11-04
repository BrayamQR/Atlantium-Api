import { Router } from "express";
import { body, param } from "express-validator";
import * as ArchivoController from "../controllers/archivo.controller.js";
import { handleErrors } from "../middlewares/validate.js";
import { uploadArchivosMemory } from "../config/multer.js";

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

router.post(
  "/profile",
  uploadArchivosMemory.single("portafolio"),
  body("idPersonaNatural")
    .notEmpty()
    .withMessage("La persona natural es obligatirio")
    .isInt({ gt: 0 })
    .withMessage("ID invalido"),
  handleErrors,
  ArchivoController.createPortaforio
);

export default router;
