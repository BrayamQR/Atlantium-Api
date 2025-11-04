import UsuarioModel from "../models/usuario.model.js";
import PerfilModel from "../models/perfil.model.js";
import PersonaNaturalModel from "../models/persona_natural.model.js";
import PersonaJuridicaModel from "../models/persona_juridica.model.js";
import RepresentanteLegalModel from "../models/representante_legal.model.js";
import TipoSociedadModel from "../models/tiposociedad.model.js";
import DistritoModel from "../models/distrito.model.js";
import ProvinciaModel from "../models/provincia.model.js";
import DepartamentoModel from "../models/departamento.model.js";
import ArchivoModel from "../models/archivo.model.js";

export const list = async () => {
  return await UsuarioModel.findAll({
    where: { vigenciaUsuario: true },
    include: [
      {
        model: PerfilModel,
        as: "perfil",
      },
      {
        model: PersonaNaturalModel,
        where: { vigenciaPerNatural: true },
        required: false,
        as: "personaNatural",
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
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivo",
          },
        ],
      },
      {
        model: PersonaJuridicaModel,
        where: { vigenciaPersonaJuridica: true },
        required: false,
        as: "personaJuridica",
        include: [
          {
            model: RepresentanteLegalModel,
            where: { vigenciaRepresentanteLegal: true },
            required: false,
            as: "representanteLegal",
          },
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
      },
    ],
  });
};

export const get = async (id) => {
  return await UsuarioModel.findOne({
    where: { idUsuario: id, vigenciaUsuario: true },
    include: [
      {
        model: PerfilModel,
        as: "perfil",
      },
      {
        model: PersonaNaturalModel,
        where: { vigenciaPerNatural: true },
        required: false,
        as: "personaNatural",
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
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivo",
          },
        ],
      },
      {
        model: PersonaJuridicaModel,
        where: { vigenciaPersonaJuridica: true },
        required: false,
        as: "personaJuridica",
        include: [
          {
            model: RepresentanteLegalModel,
            where: { vigenciaRepresentanteLegal: true },
            required: false,
            as: "representanteLegal",
          },
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
      },
    ],
  });
};

export const findByEmail = async (emailUsuario) => {
  const usuario = await UsuarioModel.findOne({
    where: {
      vigenciaUsuario: true,
      emailUsuario: emailUsuario,
    },
    include: [
      {
        model: PerfilModel,
        as: "perfil",
      },
      {
        model: PersonaNaturalModel,
        where: { vigenciaPerNatural: true },
        required: false,
        as: "personaNatural",
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
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivo",
          },
        ],
      },
      {
        model: PersonaJuridicaModel,
        where: { vigenciaPersonaJuridica: true },
        required: false,
        as: "personaJuridica",
        include: [
          {
            model: RepresentanteLegalModel,
            where: { vigenciaRepresentanteLegal: true },
            required: false,
            as: "representanteLegal",
          },
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
      },
    ],
  });
  return usuario || null;
};

export const findByNroIdent = async (nroIdentificacion) => {
  const usuario = await UsuarioModel.findOne({
    where: {
      vigenciaUsuario: true,
      nroIdentificacion: nroIdentificacion,
    },
    include: [
      {
        model: PerfilModel,
        as: "perfil",
      },
      {
        model: PersonaNaturalModel,
        where: { vigenciaPerNatural: true },
        required: false,
        as: "personaNatural",
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
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivo",
          },
        ],
      },
      {
        model: PersonaJuridicaModel,
        where: { vigenciaPersonaJuridica: true },
        required: false,
        as: "personaJuridica",
        include: [
          {
            model: RepresentanteLegalModel,
            where: { vigenciaRepresentanteLegal: true },
            required: false,
            as: "representanteLegal",
          },
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
      },
    ],
  });
  return usuario || null;
};

export const create = async (data) => {
  return await UsuarioModel.create(data);
};

export const remove = async (id) => {
  const usuario = await UsuarioModel.findOne({
    where: { idUsuario: id, vigenciaUsuario: true },
  });
  if (!usuario) return false;
  await usuario.update({ vigenciaUsuario: false });
  return true;
};

export const usuariosByPerfil = async (id) => {
  return await UsuarioModel.findAll({
    where: { idPerfil: id, vigenciaUsuario: true },
    include: [
      {
        model: PerfilModel,
        as: "perfil",
      },
      {
        model: PersonaNaturalModel,
        where: { vigenciaPerNatural: true },
        required: false,
        as: "personaNatural",
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
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivo",
          },
        ],
      },
      {
        model: PersonaJuridicaModel,
        where: { vigenciaPersonaJuridica: true },
        required: false,
        as: "personaJuridica",
        include: [
          {
            model: RepresentanteLegalModel,
            where: { vigenciaRepresentanteLegal: true },
            required: false,
            as: "representanteLegal",
          },
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
      },
    ],
  });
};
export const update = async (id, data) => {
  const usuario = await UsuarioModel.findOne({
    where: { idUsuario: id, vigenciaUsuario: true },
  });
  if (!usuario) return null;
  await usuario.update(data);
  return usuario;
};

export const findByGoogleId = async (googleId) => {
  return await UsuarioModel.findOne({ where: { googleId } });
};
