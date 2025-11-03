import { Router } from "express";
import { body } from "express-validator";
import * as comentarioController from "../controllers/comentario.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.post(
  "/",
  body("idTramite")
    .isInt({ gt: 0 })
    .withMessage("ID invalido")
    .notEmpty()
    .withMessage("el tramite es obligatorio"),
  body("idUsuario")
    .isInt({ gt: 0 })
    .withMessage("ID invalido")
    .notEmpty()
    .withMessage("El usuario es obligatorio"),
  body("descComentario")
    .notEmpty()
    .withMessage("La descripcion es obligatoria"),
  handleErrors,
  comentarioController.create
);

export default router;
