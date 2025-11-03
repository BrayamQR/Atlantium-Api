import * as GenericListService from "../services/genericlist.service.js";
import { handleControllerError } from "../utils/errors.js";

export const listTipoSociedad = async (req, res) => {
  try {
    const lstTipoSociedad = await GenericListService.listTipoSociedad();
    res.json(lstTipoSociedad);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const listUbigeo = async (req, res) => {
  try {
    const lstUbigeo = await GenericListService.listUbigeo();
    res.json(lstUbigeo);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const listEtapa = async (req, res) => {
  try {
    const listEtapa = await GenericListService.listEtapa();
    res.json(listEtapa);
  } catch (error) {
    handleControllerError(res, error);
  }
};
