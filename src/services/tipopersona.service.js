import * as TipoPersonaRepository from "../repositories/tipopersona.repository.js";
import TipoPersonaDTO from "../dtos/tipopersona.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import stringFormat from "../utils/stringFormat.js";
import tipopersonaDto from "../dtos/tipopersona.dto.js";
import sequelize from "../config/db.js";

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

export const getPN = async (id) => {
  const persona = await TipoPersonaRepository.getPN(id);
  return persona ? new tipopersonaDto.PersonaNaturalDTO(persona) : null;
};

export const getPJ = async (id) => {
  const persona = await TipoPersonaRepository.getPJ(id);
  return persona ? new tipopersonaDto.PersonaJuridicaDTO(persona) : null;
};

export const getRL = async (id) => {
  const persona = await TipoPersonaRepository.getRL(id);
  return persona ? new TipoPersonaDTO.RepresentanteLegalDTO(persona) : null;
};

export const updatePN = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    const persona = await TipoPersonaRepository.getPN(id);

    if (!persona) {
      throw new ValidationError(
        "Persona no encontrada",
        ERROR_CODES.PERSON_NOT_FOUND
      );
    }

    data = sanitizeData(data);
    if (data.nomPersona)
      data.nomPersona = stringFormat.capitalizeAuto(data.nomPersona);
    if (data.apePersona)
      data.apePersona = stringFormat.capitalizeAuto(data.apePersona);
    if (data.dirPersona)
      data.dirPersona = stringFormat.capitalizeAuto(data.dirPersona);
    if (data.espeProfesional)
      data.espeProfesional = stringFormat.capitalizeAuto(data.espeProfesional);

    if (data.docIdentidad && data.docIdentidad !== persona.docIdentidad) {
      const docIdentExist = await TipoPersonaRepository.findPNByDocIdentidad(
        data.docIdentidad
      );
      if (docIdentExist) {
        throw new ValidationError(
          "El DNI ya esta registrado",
          ERROR_CODES.NRO_IDENT_EXISTS
        );
      }
    }

    if (
      data.rucPersonaNatural &&
      data.rucPersonaNatural !== persona.rucPersonaNatural
    ) {
      const rucPersonaExist =
        await TipoPersonaRepository.findPNByRucPersonaNatural(
          data.rucPersonaNatural
        );

      if (rucPersonaExist) {
        throw new ValidationError(
          "El RUC ya está registrado",
          ERROR_CODES.RUC_EXIST
        );
      }
    }
    await TipoPersonaRepository.updatePN(id, data, {
      transaction,
    });

    await transaction.commit();

    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const updatePJ = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    const persona = await TipoPersonaRepository.getPJ(id);

    if (!persona) {
      throw new ValidationError(
        "Persona no encontrada",
        ERROR_CODES.PERSON_NOT_FOUND
      );
    }

    data = sanitizeData(data);
    if (data.razonSocial)
      data.razonSocial = stringFormat.capitalizeAuto(data.razonSocial);
    if (data.nomComercio)
      data.nomComercio = stringFormat.capitalizeAuto(data.nomComercio);
    if (data.dirLegal)
      data.dirLegal = stringFormat.capitalizeAuto(data.dirLegal);
    if (data.webEmpresarial)
      data.webEmpresarial = stringFormat.toLowerCaseText(data.webEmpresarial);

    if (
      data.rucPersonaJuridica &&
      data.rucPersonaJuridica !== persona.rucPersonaJuridica
    ) {
      const rucPersonaExist =
        await TipoPersonaRepository.findPJByRucPersonaJuridica(
          data.rucPersonaJuridica
        );

      if (rucPersonaExist) {
        throw new ValidationError(
          "El RUC ya está registrado",
          ERROR_CODES.RUC_EXIST
        );
      }
    }

    await TipoPersonaRepository.updatePJ(id, data, {
      transaction,
    });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const updateRL = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    const persona = await TipoPersonaRepository.getRL(id);

    if (!persona) {
      throw new ValidationError(
        "Persona no encontrada",
        ERROR_CODES.PERSON_NOT_FOUND
      );
    }
    data = sanitizeData(data);

    if (data.nomRepresentante)
      data.nomRepresentante = stringFormat.capitalizeAuto(
        data.nomRepresentante
      );
    if (data.apeRepresentante)
      data.apeRepresentante = stringFormat.capitalizeAuto(
        data.apeRepresentante
      );
    if (data.emailRepresentante)
      data.emailRepresentante = stringFormat.toLowerCaseText(
        data.emailRepresentante
      );
    if (data.cargoRepresentante)
      data.cargoRepresentante = stringFormat.capitalizeAuto(
        data.cargoRepresentante
      );

    if (data.docIdentidad && data.docIdentidad !== persona.docIdentidad) {
      const dniPersonaExist =
        await TipoPersonaRepository.findPJByDniRepresentanteLegal(
          data.docIdentidad
        );

      if (dniPersonaExist) {
        throw new ValidationError(
          "El DNI ya está registrado",
          ERROR_CODES.NRO_IDENT_EXISTS
        );
      }
    }

    await TipoPersonaRepository.updateRL(id, data, {
      transaction,
    });
    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
