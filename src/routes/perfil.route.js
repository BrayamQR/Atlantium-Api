import { Router } from "express";
import { body, param } from "express-validator";
import * as perfilController from "../controllers/perfil.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.get("/", perfilController.list);

router.get(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  perfilController.get
);

router.post(
  "/",
  body("nomPerfil")
    .notEmpty()
    .withMessage("El nombre del perfil es obligatorio"),
  body("descPerfil")
    .notEmpty()
    .withMessage("La descripción del perfil es obligatoria"),
  handleErrors,
  perfilController.create
);

router.put(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  body("nomPerfil")
    .notEmpty()
    .withMessage("El nombre del perfil es obligatorio"),
  body("descPerfil")
    .notEmpty()
    .withMessage("La descripción del perfil es oblogatoria"),
  handleErrors,
  perfilController.update
);

router.delete(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  perfilController.remove
);

router.patch(
  "/:id/toggle",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  perfilController.toggleEstado
);

export default router;
