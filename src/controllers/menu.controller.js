import * as MenuService from "../services/menu.service.js";
import { handleControllerError } from "../utils/errors.js";

export const create = async (req, res) => {
  try {
    const menu = await MenuService.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const list = async (req, res) => {
  try {
    const menus = await MenuService.list();
    res.json(menus);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const listByPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id) === 0) {
      return res.status(200).json([]);
    }
    const menus = await MenuService.listByPerfil(Number(id));
    res.status(200).json(menus);
  } catch (error) {
    handleControllerError(res, error);
  }
};
