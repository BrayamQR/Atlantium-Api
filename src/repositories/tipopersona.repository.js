import PersonaNaturalModel from "../models/persona_natural.model.js";
import PersonaJuridicaModel from "../models/persona_juridica.model.js";
import RepresentanteLegalModel from "../models/representante_legal.model.js";
import UsuarioModel from "../models/usuario.model.js";
import PersonaJuridica from "../models/persona_juridica.model.js";

export const listPN = async () => {
  return PersonaNaturalModel.findAll({
    where: { vigenciaPerNatural: true },
  });
};

export const listPJ = async () => {
  return PersonaJuridica.findAll({
    where: { vigenciaPersonaJuridica: true },
  });
};

export const getPNByIdUsuario = async (id) => {
  return PersonaNaturalModel.findOne({
    where: { idUsuario: id, vigenciaPerNatural: true },
    include: [
      {
        model: UsuarioModel,
      },
    ],
  });
};

export const getPN = async (id) => {
  return PersonaNaturalModel.findOne({
    where: { idUsuario: id, vigenciaPerNatural: true },
    include: [
      {
        model: UsuarioModel,
      },
    ],
  });
};

export const getPJByIdUsuario = async (id) => {
  return PersonaJuridicaModel.findOne({
    where: { idUsuario: id, vigenciaPersonaJuridica: true },
  });
};

export const getPJ = async (id) => {
  return PersonaJuridicaModel.findOne({
    where: { idPersonaJuridica: id, vigenciaPersonaJuridica: true },
  });
};

export const createPN = async (data) => {
  return await PersonaNaturalModel.create(data);
};

export const createPJ = async (data) => {
  return await PersonaJuridicaModel.create(data);
};

export const createRL = async (data) => {
  return await RepresentanteLegalModel.create(data);
};

export const findPNByDocIdentidad = async (docIdentidad) => {
  const persona = await PersonaNaturalModel.findOne({
    where: {
      vigenciaPerNatural: true,
      docIdentidad: docIdentidad,
    },
  });

  return persona || null;
};

export const findPNByRucPersonaNatural = async (rucPersonaNatural) => {
  const persona = await PersonaNaturalModel.findOne({
    where: {
      vigenciaPerNatural: true,
      rucPersonaNatural: rucPersonaNatural,
    },
  });
  return persona || null;
};

export const findPJByRucPersonaJuridica = async (rucPersonaJuridica) => {
  const persona = await PersonaJuridicaModel.findOne({
    where: {
      vigenciaPersonaJuridica: true,
      rucPersonaJuridica: rucPersonaJuridica,
    },
  });
  return persona || null;
};

// 🔹 Actualiza Persona Natural
export const updatePN = async (idPersonaNatural, data) => {
  return await PersonaNaturalModel.update(data, {
    where: { idPersonaNatural: idPersonaNatural },
  });
};

// 🔹 Actualiza Persona Jurídica
export const updatePJ = async (idPersonaJuridica, data) => {
  return await PersonaJuridicaModel.update(data, {
    where: { idPersonaJuridica: idPersonaJuridica },
  });
};

// 🔹 Actualiza Representante Legal
export const updateRL = async (idRepresentante, data) => {
  return await RepresentanteLegalModel.update(data, {
    where: { idRepresentante: idRepresentante },
  });
};
