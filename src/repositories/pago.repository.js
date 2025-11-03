import PagoModel from "../models/pago.model.js";
import TramiteModel from "../models/tramite.model.js";
import EstadoPagoModel from "../models/estadopago.model.js";
import UsuarioModel from "../models/usuario.model.js";
import PersonaNaturalModel from "../models/persona_natural.model.js";
import PersonaJuridicaModel from "../models/persona_juridica.model.js";
import EtapaModel from "../models/etapa.model.js";

export const create = async (data) => {
  return await PagoModel.create(data);
};

export const update = async (id, data) => {
  const pago = await PagoModel.findOne({
    where: { idPago: id, vigenciaPago: true },
  });

  if (!pago) return null;

  await pago.update(data);
  return pago;
};

export const list = async (data) => {
  const pagos = await TramiteModel.findAll({
    where: {
      vigenciaTramite: true,
    },
    include: [
      {
        model: UsuarioModel,
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
        model: PagoModel,
        where: {
          vigenciaPago: true,
        },
        required: true,
        as: "pago",
        include: [{ model: EstadoPagoModel, required: true, as: "estadoPago" }],
      },
      {
        model: EtapaModel,
        where: { vigenciaEtapa: true },
        required: false,
        as: "etapa",
      },
    ],
  });

  return pagos || null;
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
        model: PagoModel,
        where: {
          vigenciaPago: true,
        },
        required: true,
        as: "pago",
        include: [{ model: EstadoPagoModel, required: true, as: "estadoPago" }],
      },
      {
        model: EtapaModel,
        where: { vigenciaEtapa: true },
        required: false,
        as: "etapa",
      },
    ],
  });
};

export const findByUsuario = async (id) => {
  const pagos = await TramiteModel.findAll({
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
        model: PagoModel,
        where: {
          vigenciaPago: true,
        },
        required: true,
        as: "pago",
        include: [{ model: EstadoPagoModel, required: true, as: "estadoPago" }],
      },
      {
        model: EtapaModel,
        where: { vigenciaEtapa: true },
        required: false,
        as: "etapa",
      },
    ],
  });

  return pagos || null;
};

export const findAllState = async () => {
  return await EstadoPagoModel.findAll();
};
