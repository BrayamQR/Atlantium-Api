import * as VariablesRepostitory from "../repositories/variable.repository.js";
import VariablesDTO from "../dtos/variables.dto.js";

export const findByName = async (name) => {
  const varible = await VariablesRepostitory.findByName(name);

  return varible ? new VariablesDTO(varible) : null;
};
