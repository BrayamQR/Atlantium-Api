import { Router } from "express";
import * as GenericListController from "../controllers/genericlist.controller.js";
import { handleErrors } from "../middlewares/validate.js";

const router = Router();

router.get("/tipsoc", GenericListController.listTipoSociedad);
router.get("/ubig", GenericListController.listUbigeo);
router.get("/etapa", GenericListController.listEtapa);

export default router;
