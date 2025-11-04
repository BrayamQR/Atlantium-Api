import { Router } from "express";
import { body, param } from "express-validator";
import * as TipoPersonaController from "../controllers/tipopersona.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.get("/pernat", TipoPersonaController.listPN);
router.get("/perjur", TipoPersonaController.listPJ);

router.get(
  "/:id/personPN",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  TipoPersonaController.getPN
);
router.get(
  "/:id/personPJ",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  TipoPersonaController.getPJ
);
router.get(
  "/:id/personRL",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  TipoPersonaController.getRL
);

router.put(
  "/:id/personPN",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  TipoPersonaController.updatePN
);
router.put(
  "/:id/personPJ",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  TipoPersonaController.updatePJ
);
router.put(
  "/:id/personRL",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  TipoPersonaController.updateRL
);

export default router;
