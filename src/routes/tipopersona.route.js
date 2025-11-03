import { Router } from "express";
import { body, param } from "express-validator";
import * as TipoPersonaController from "../controllers/tipopersona.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.get("/pernat", TipoPersonaController.listPN);
router.get("/perjur", TipoPersonaController.listPJ);

export default router;
