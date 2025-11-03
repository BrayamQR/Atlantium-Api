import { Router } from "express";
import { body, param } from "express-validator";
import { handleErrors } from "../middlewares/validate.js";
import * as pagoController from "../controllers/pago.controller.js";

const router = Router();

router.post(
  "/",
  body("idTramite")
    .isInt({ gt: 0 })
    .withMessage("ID del tramite invalido")
    .notEmpty()
    .withMessage("El tramite es obligatorio"),
  body("idUsuario")
    .isInt({ gt: 0 })
    .withMessage("ID del usuario invalido")
    .notEmpty()
    .withMessage("El usuario es obligatorio"),
  body("montoPago")
    .isFloat({ gt: 0 })
    .withMessage("El monto debe ser un número mayor que 0")
    .notEmpty()
    .withMessage("El monto es obligatorio"),
  handleErrors,
  pagoController.create
);

router.get("/", pagoController.list);

router.get(
  "/:id/paybyuser",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  pagoController.listPagosByUsuario
);

router.get("/statespay", pagoController.findAllState);

router.get(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  pagoController.get
);

router.put(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  pagoController.update
);

router.post("/crear-preferencia", pagoController.crearPreferencia);

router.post("/notificacion", pagoController.notificacion);

export default router;
