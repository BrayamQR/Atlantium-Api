import { Router } from "express";
import { body, param } from "express-validator";
import * as MenuController from "../controllers/menu.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.get("/", MenuController.list);

router.get("/:id", MenuController.listByPerfil);

router.post(
  "/",
  body("tituloMenu").notEmpty().withMessage("El titulo es obligatorio"),
  body("pathMenu").notEmpty().withMessage("El path es obligatorio"),
  body("ordenMenu").notEmpty().withMessage("El orden es obligatorio"),
  handleErrors,
  MenuController.create
);

export default router;
