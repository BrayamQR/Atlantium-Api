import { Router } from "express";
import { body, param } from "express-validator";
import { handleErrors } from "../middlewares/validate.js";
import { uploadArchivosMemory } from "../config/multer.js";
import * as SolicitudController from "../controllers/solicitud.controller.js";

const router = Router();

router.post(
  "/",
  uploadArchivosMemory.array("archivos", 10),
  body("idUsuario").notEmpty().withMessage("El usuario es obligatorio"),
  body("idTramite").notEmpty().withMessage("El tramite es obligatorio"),
  body("asuntoSolicitud").notEmpty().withMessage("El asunto es obligatorio"),
  body("descSolicitud")
    .notEmpty()
    .withMessage("La descripcion de la solicitud es obligatoria"),
  handleErrors,
  SolicitudController.create
);

export default router;
