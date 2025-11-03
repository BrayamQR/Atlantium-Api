import * as PerfilService from "../services/perfil.service.js";
import { handleControllerError } from "../utils/errors.js";

export const list = async (req, res) => {
  try {
    const lstPerfil = await PerfilService.list();
    res.json(lstPerfil);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await PerfilService.get(Number(id));
    if (!perfil) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    res.json(perfil);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const create = async (req, res) => {
  try {
    const perfil = await PerfilService.create(req.body);
    res.status(201).json(perfil);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await PerfilService.update(Number(id), req.body);
    if (!perfil) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    res.json(perfil);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await PerfilService.remove(Number(id));
    if (!response) {
      return res
        .status(404)
        .json({ message: "Perfil no encontrado o ya eliminado" });
    }
    res.json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const toggleEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await PerfilService.toggleEstado(Number(id));
    if (!perfil) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    res.json(perfil);
  } catch (error) {
    handleControllerError(res, error);
  }
};
