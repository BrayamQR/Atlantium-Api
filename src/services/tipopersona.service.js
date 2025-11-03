import * as TipoPersonaRepository from "../repositories/tipopersona.repository.js";
import TipoPersonaDTO from "../dtos/tipopersona.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import stringFormat from "../utils/stringFormat.js";

export const listPN = async () => {
  const lstPersonas = await TipoPersonaRepository.listPN();
  return lstPersonas.map((p) => new TipoPersonaDTO.PersonaNaturalDTO(p));
};

export const listPJ = async () => {
  const lstPersonas = await TipoPersonaRepository.listPJ();
  return lstPersonas.map((p) => new TipoPersonaDTO.PersonaJuridicaDTO(p));
};

export const createPN = async (data) => {
  data = sanitizeData(data);

  if (data.nomPersona)
    data.nomPersona = stringFormat.capitalizeAuto(data.nomPersona);
  if (data.apePersona)
    data.apePersona = stringFormat.capitalizeAuto(data.apePersona);
  if (data.dirPersona)
    data.dirPersona = stringFormat.capitalizeAuto(data.dirPersona);
  if (data.espeProfesional)
    data.espeProfesional = stringFormat.capitalizeAuto(data.espeProfesional);

  const docIdentExist = await TipoPersonaRepository.findPNByDocIdentidad(
    data.docIdentidad
  );
  if (docIdentExist) {
    throw new ValidationError(
      "El numero de indentificación ya esta registrado",
      ERROR_CODES.NRO_IDENT_EXISTS
    );
  }
  const rucPersonaExist = await TipoPersonaRepository.findPNByRucPersonaNatural(
    data.rucPersonaNatural
  );
  if (rucPersonaExist) {
    throw new ValidationError(
      "El Ruc ya esta registrado",
      ERROR_CODES.RUC_EXIST
    );
  }
  const persona = await TipoPersonaRepository.createPN(data);
  return new TipoPersonaDTO.PersonaNaturalDTO(persona);
};
