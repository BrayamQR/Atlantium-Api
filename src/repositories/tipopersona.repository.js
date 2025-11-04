import PersonaNaturalModel from "../models/persona_natural.model.js";
import PersonaJuridicaModel from "../models/persona_juridica.model.js";
import RepresentanteLegalModel from "../models/representante_legal.model.js";
import UsuarioModel from "../models/usuario.model.js";
import PersonaJuridica from "../models/persona_juridica.model.js";
import DistritoModel from "../models/distrito.model.js";
import ProvinciaModel from "../models/provincia.model.js";
import DepartamentoModel from "../models/departamento.model.js";
import TipoSociedadModel from "../models/tiposociedad.model.js";

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

export const getPJByIdUsuario = async (id) => {
  return PersonaJuridicaModel.findOne({
    where: { idUsuario: id, vigenciaPersonaJuridica: true },
  });
};
export const getPN = async (id) => {
  return PersonaNaturalModel.findOne({
    where: { idPersonaNatural: id, vigenciaPerNatural: true },
    include: [
      {
        model: DistritoModel,
        as: "distrito",
        include: [
          {
            model: ProvinciaModel,
            as: "provincia",
            include: [
              {
                model: DepartamentoModel,
                as: "departamento",
              },
            ],
          },
        ],
      },
    ],
  });
};
export const getPJ = async (id) => {
  return PersonaJuridicaModel.findOne({
    where: { idPersonaJuridica: id, vigenciaPersonaJuridica: true },
    include: [
      {
        model: TipoSociedadModel,
        where: { vigenciaTipoSociedad: true },
        required: false,
        as: "tipoSociedad",
      },
      {
        model: DistritoModel,
        as: "distrito",
        include: [
          {
            model: ProvinciaModel,
            as: "provincia",
            include: [
              {
                model: DepartamentoModel,
                as: "departamento",
              },
            ],
          },
        ],
      },
    ],
  });
};

export const getRL = async (id) => {
  return RepresentanteLegalModel.findOne({
    where: { idRepresentante: id, vigenciaRepresentanteLegal: true },
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

export const findPJByDniRepresentanteLegal = async (docIdentidad) => {
  const persona = await RepresentanteLegalModel.findOne({
    where: {
      docIdentidad: docIdentidad,
      vigenciaRepresentanteLegal: true,
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
