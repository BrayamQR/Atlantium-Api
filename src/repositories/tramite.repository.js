import TramiteModel from "../models/tramite.model.js";
import UsuarioModel from "../models/usuario.model.js";
import PerfilModel from "../models/perfil.model.js";
import PersonaNaturalModel from "../models/persona_natural.model.js";
import PersonaJuridicaModel from "../models/persona_juridica.model.js";
import ArchivoModel from "../models/archivo.model.js";
import EtapaModel from "../models/etapa.model.js";
import EncargadoModel from "../models/encargado.model.js";
import ComentarioModel from "../models/comentario.model.js";
import ObservacionModel from "../models/observacion.model.js";
import PagoModel from "../models/pago.model.js";
import EstadoPagoModel from "../models/estadopago.model.js";
import SolicitudModel from "../models/solicitud.model.js";
import SeguimientoModel from "../models/seguimiento.model.js";

export const create = async (data) => {
  return await TramiteModel.create(data);
};

export const update = async (id, data) => {
  const tramite = await TramiteModel.findOne({
    where: { idTramite: id, vigenciaTramite: true },
  });
  if (!tramite) return null;
  await tramite.update(data);
  return tramite;
};

export const remove = async (id) => {
  const tramite = await TramiteModel.findOne({
    where: { idTramite: id, vigenciaTramite: true },
  });

  if (!tramite) return null;

  await tramite.update({ vigenciaTramite: false });
  return true;
};

export const findByUsuario = async (id) => {
  const tramites = await TramiteModel.findAll({
    where: {
      idUsuario: id,
      vigenciaTramite: true,
    },
    include: [
      {
        model: UsuarioModel,
        as: "usuario",
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
          },
          {
            model: PersonaJuridicaModel,
            where: { vigenciaPersonaJuridica: true },
            required: false,
            as: "personaJuridica",
          },
        ],
      },
      {
        model: ArchivoModel,
        where: { vigenciaArchivo: true },
        required: false,
        as: "archivos",
      },
      {
        model: EtapaModel,
        where: { vigenciaEtapa: true },
        required: false,
        as: "etapa",
      },
      {
        model: EncargadoModel,
        where: { vigenciaEncargado: true },
        required: false,
        as: "encargado",
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
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
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: ComentarioModel,
        where: { vigenciaComentario: true },
        required: false,
        as: "comentario",
        separate: true,
        order: [["fechaCreacion", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: ObservacionModel,
        where: { vigenciaObservacion: true },
        required: false,
        as: "observacion",
        separate: true,
        order: [["fechaCreacion", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: PagoModel,
        where: { vigenciaPago: true },
        required: false,
        as: "pago",
        include: [
          { model: EstadoPagoModel, required: false, as: "estadoPago" },
        ],
      },
      {
        model: SolicitudModel,
        where: { vigenciaSolicitud: true },
        required: false,
        as: "solicitud",
        separate: true,
        order: [["fechaEmision", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivos",
          },
        ],
      },
      {
        model: SeguimientoModel,
        where: { vigenciaSeguimiento: true },
        required: false,
        as: "seguimiento",
        include: [
          {
            model: EtapaModel,
            where: { vigenciaEtapa: true },
            required: false,
            as: "etapa",
          },
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
    ],
  });
  return tramites || null;
};

export const list = async () => {
  const tramites = await TramiteModel.findAll({
    where: {
      vigenciaTramite: true,
    },
    include: [
      {
        model: UsuarioModel,
        as: "usuario",
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
          },
          {
            model: PersonaJuridicaModel,
            where: { vigenciaPersonaJuridica: true },
            required: false,
            as: "personaJuridica",
          },
        ],
      },
      {
        model: ArchivoModel,
        where: { vigenciaArchivo: true },
        required: false,
        as: "archivos",
      },
      {
        model: EtapaModel,
        where: { vigenciaEtapa: true },
        required: false,
        as: "etapa",
      },
      {
        model: EncargadoModel,
        where: { vigenciaEncargado: true },
        required: false,
        as: "encargado",
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
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
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: ComentarioModel,
        where: { vigenciaComentario: true },
        required: false,
        as: "comentario",
        separate: true,
        order: [["fechaCreacion", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: ObservacionModel,
        where: { vigenciaObservacion: true },
        required: false,
        as: "observacion",
        separate: true,
        order: [["fechaCreacion", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: PagoModel,
        where: { vigenciaPago: true },
        required: false,
        as: "pago",
        include: [
          { model: EstadoPagoModel, required: false, as: "estadoPago" },
        ],
      },
      {
        model: SolicitudModel,
        where: { vigenciaSolicitud: true },
        required: false,
        as: "solicitud",
        separate: true,
        order: [["fechaEmision", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivos",
          },
        ],
      },
      {
        model: SeguimientoModel,
        where: { vigenciaSeguimiento: true },
        required: false,
        as: "seguimiento",
        include: [
          {
            model: EtapaModel,
            where: { vigenciaEtapa: true },
            required: false,
            as: "etapa",
          },
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
    ],
  });
  return tramites || null;
};
export const get = async (id) => {
  return await TramiteModel.findOne({
    where: { idTramite: id, vigenciaTramite: true },
    include: [
      {
        model: UsuarioModel,
        as: "usuario",
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
          },
          {
            model: PersonaJuridicaModel,
            where: { vigenciaPersonaJuridica: true },
            required: false,
            as: "personaJuridica",
          },
        ],
      },
      {
        model: ArchivoModel,
        where: { vigenciaArchivo: true },
        required: false,
        as: "archivos",
      },
      {
        model: EtapaModel,
        where: { vigenciaEtapa: true },
        required: true,
        as: "etapa",
      },
      {
        model: EncargadoModel,
        where: { vigenciaEncargado: true },
        required: false,
        as: "encargado",
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
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
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: ComentarioModel,
        where: { vigenciaComentario: true },
        required: false,
        as: "comentario",
        separate: true,
        order: [["fechaCreacion", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: ObservacionModel,
        where: { vigenciaObservacion: true },
        required: false,
        as: "observacion",
        separate: true,
        order: [["fechaCreacion", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: PagoModel,
        where: { vigenciaPago: true },
        required: false,
        as: "pago",
        include: [
          { model: EstadoPagoModel, required: false, as: "estadoPago" },
        ],
      },
      {
        model: SolicitudModel,
        where: { vigenciaSolicitud: true },
        required: false,
        as: "solicitud",
        separate: true,
        order: [["fechaEmision", "DESC"]],
        include: [
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
          {
            model: ArchivoModel,
            where: { vigenciaArchivo: true },
            required: false,
            as: "archivos",
          },
        ],
      },
      {
        model: SeguimientoModel,
        where: { vigenciaSeguimiento: true },
        required: false,
        as: "seguimiento",
        include: [
          {
            model: EtapaModel,
            where: { vigenciaEtapa: true },
            required: true,
            as: "etapa",
          },
          {
            model: UsuarioModel,
            where: { vigenciaUsuario: true },
            required: false,
            as: "usuario",
            include: [
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
    ],
  });
};

export const findByEncargado = async (id) => {
  const tramites = await TramiteModel.findAll({
    where: {
      vigenciaTramite: true,
    },
    include: [
      {
        model: EncargadoModel,
        as: "encargado",
        required: true,
        where: {
          vigenciaEncargado: true,
        },
        include: [
          {
            model: UsuarioModel,
            as: "usuario",
            where: {
              vigenciaUsuario: true,
              idUsuario: id,
            },
            include: [
              { model: PerfilModel, as: "perfil" },
              {
                model: PersonaNaturalModel,
                where: { vigenciaPerNatural: true },
                required: false,
                as: "personaNatural",
              },
              {
                model: PersonaJuridicaModel,
                where: { vigenciaPersonaJuridica: true },
                required: false,
                as: "personaJuridica",
              },
            ],
          },
        ],
      },
      {
        model: UsuarioModel,
        as: "usuario",
        include: [
          { model: PerfilModel, as: "perfil" },
          {
            model: PersonaNaturalModel,
            where: { vigenciaPerNatural: true },
            required: false,
            as: "personaNatural",
          },
          {
            model: PersonaJuridicaModel,
            where: { vigenciaPersonaJuridica: true },
            required: false,
            as: "personaJuridica",
          },
        ],
      },
      {
        model: ArchivoModel,
        where: { vigenciaArchivo: true },
        required: false,
        as: "archivos",
      },
      {
        model: EtapaModel,
        where: { vigenciaEtapa: true },
        required: false,
        as: "etapa",
      },
    ],
  });
  return tramites || null;
};
