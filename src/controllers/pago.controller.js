import * as PagoService from "../services/pago.service.js";
import { handleControllerError } from "../utils/errors.js";

export const create = async (req, res) => {
  try {
    const pago = await PagoService.create(req.body);
    res.status(201).json(pago);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const list = async (req, res) => {
  try {
    const lstPagos = await PagoService.list();
    res.json(lstPagos);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await PagoService.get(Number(id));
    if (!pago) {
      return res
        .status(404)
        .json({ message: "Historial de pago no encontrado" });
    }
    res.json(pago);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const listPagosByUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const pagos = await PagoService.listPagosByUsuario(Number(id));
    res.json(pagos);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const findAllState = async (req, res) => {
  try {
    const lstEstados = await PagoService.findAllState();
    res.json(lstEstados);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await PagoService.update(Number(id), req.body);
    if (!pago) {
      return res.status(404).json({ message: "pago no encontrado" });
    }
    res.json(pago);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const crearPreferencia = async (req, res) => {
  try {
    const { monto, descripcion, idPago } = req.body;
    const result = await PagoService.crearPreferencia(
      monto,
      descripcion,
      idPago
    );
    res.json(result);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const notificacion = async (req, res) => {
  try {
    const topic = req.body.topic || req.body.type;
    const paymentId =
      req.query.id || req.query["data.id"] || req.body.data?.id || req.body.id;

    if (topic !== "payment") return res.sendStatus(200);
    if (!paymentId) return res.status(400).send("Falta ID de pago");

    await PagoService.notificacion(paymentId);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
