import TipoSociedadModel from "../models/tiposociedad.model.js";
import DistritoModel from "../models/distrito.model.js";
import ProvinciaModel from "../models/provincia.model.js";
import DepartamentoModel from "../models/departamento.model.js";
import EtapaModel from "../models/etapa.model.js";

export const listTipoSociedad = async () => {
  return await TipoSociedadModel.findAll({
    where: { vigenciaTipoSociedad: true },
  });
};

export const listUbigeo = async () => {
  return await DistritoModel.findAll({
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
    order: [
      ["idDistrito", "ASC"],
      [{ model: ProvinciaModel, as: "provincia" }, "idProvincia", "ASC"],
      [
        { model: ProvinciaModel, as: "provincia" },
        { model: DepartamentoModel, as: "departamento" },
        "idDepartamento",
        "ASC",
      ],
    ],
  });
};
export const listEtapa = async () => {
  return await EtapaModel.findAll({
    where: { vigenciaEtapa: true },
  });
};
