import * as VariablesService from "../services/variable.service.js";
import { handleControllerError } from "../utils/errors.js";

export const findByName = async (req, res) => {
  try {
    const { name } = req.params;
    const variable = await VariablesService.findByName(name);
    res.json(variable);
  } catch (error) {
    handleControllerError(res, error);
  }
};
