import * as TramiteService from "../services/tramite.service.js";
import { handleControllerError } from "../utils/errors.js";

export const create = async (req, res) => {
  try {
    const archivo = req.files;
    const tramite = await TramiteService.create(req.body, archivo);
    res.status(201).json(tramite);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const listTramitesByUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const tramites = await TramiteService.listTramitesByUsuario(Number(id));
    res.json(tramites);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const findByEncargado = async (req, res) => {
  try {
    const { id } = req.params;
    const tramites = await TramiteService.findByEncargado(Number(id));
    res.json(tramites);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const tramite = await TramiteService.get(Number(id));
    if (!tramite) {
      return res
        .status(404)
        .json({ message: "Tramite no encontrado o esta dado de baja" });
    }
    res.json(tramite);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const tramite = await TramiteService.update(Number(id), req.body);
    if (!tramite) {
      return res.status(404).json({ message: "Tramite no encontrado" });
    }
    res.json(tramite);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const historialCambios = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await TramiteService.historialCambios(id);
    res.json(historial);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TramiteService.remove(Number(id));
    if (!response) {
      return res
        .status(404)
        .json({ message: "Tramite no encontrado o ya eliminado" });
    }
    res.json({ message: "Tramite eliminado exitosamente" });
  } catch (error) {
    handleControllerError(res, error);
  }
};
