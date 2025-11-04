import * as TipoPersonaService from "../services/tipopersona.service.js";
import { handleControllerError } from "../utils/errors.js";

export const listPN = async (req, res) => {
  try {
    const lstPersonas = await TipoPersonaService.listPN();
    res.json(lstPersonas);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const listPJ = async (req, res) => {
  try {
    const lstPersonas = await TipoPersonaService.listPJ();
    res.json(lstPersonas);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const getPN = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await TipoPersonaService.getPN(Number(id));
    if (!persona) {
      return res
        .status(404)
        .json({ message: "Persona no encontrado o esta dado de baja" });
    }
    res.json(persona);
  } catch (error) {
    handleControllerError(res, error);
  }
};
export const getPJ = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await TipoPersonaService.getPJ(Number(id));
    if (!persona) {
      return res
        .status(404)
        .json({ message: "Persona no encontrado o esta dado de baja" });
    }
    res.json(persona);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const getRL = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await TipoPersonaService.getRL(Number(id));
    if (!persona) {
      return res
        .status(404)
        .json({ message: "Persona no encontrado o esta dado de baja" });
    }
    res.json(persona);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const updatePN = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TipoPersonaService.updatePN(Number(id), req.body);
    if (!response) {
      return res.status(404).json({ message: "Persona no encontrado" });
    }
    res.json({ message: "Datos editados correctamente" });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const updatePJ = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TipoPersonaService.updatePJ(Number(id), req.body);
    if (!response) {
      return res.status(404).json({ message: "Persona no encontrado" });
    }
    res.json({ message: "Datos editados correctamente" });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const updateRL = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TipoPersonaService.updateRL(Number(id), req.body);
    if (!response) {
      return res.status(404).json({ message: "Persona no encontrado" });
    }
    res.json({ message: "Datos editados correctamente" });
  } catch (error) {
    handleControllerError(res, error);
  }
};
