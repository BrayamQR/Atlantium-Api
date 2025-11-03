import TipoSociedadModel from "../models/tiposociedad.model.js";
import VariableModel from "../models/variablesglobales.model.js";
import stringFormat from "../utils/stringFormat.js";

export const seedTipoSociedad = async () => {
  const tipos = [
    { codTipoSociedad: "S.A.", descTipoSociedad: "Sociedad Anónima (S.A.)" },
    {
      codTipoSociedad: "S.A.C.",
      descTipoSociedad: "Sociedad Anónima Cerrada (S.A.C.)",
    },
    {
      codTipoSociedad: "S.A.A.",
      descTipoSociedad: "Sociedad Anónima Abierta (S.A.A.)",
    },
    {
      codTipoSociedad: "S.R.L.",
      descTipoSociedad:
        "Sociedad Comercial de Responsabilidad Limitada (S.R.L.)",
    },
    { codTipoSociedad: "S.C.", descTipoSociedad: "Sociedad Colectiva (S.C.)" },
    {
      codTipoSociedad: "S.C.S.",
      descTipoSociedad: "Sociedad en Comandita Simple (S. en C.S.)",
    },
    {
      codTipoSociedad: "S.C.A.",
      descTipoSociedad: "Sociedad en Comandita por Acciones (S. en C.A.)",
    },
    { codTipoSociedad: "S.CIV.", descTipoSociedad: "Sociedad Civil (S.Civ.)" },
    {
      codTipoSociedad: "S.CIV.R.L.",
      descTipoSociedad:
        "Sociedad Civil de Responsabilidad Limitada (S.Civ.R.L.)",
    },
    {
      codTipoSociedad: "E.I.R.L.",
      descTipoSociedad:
        "Empresa Individual de Responsabilidad Limitada (E.I.R.L.)",
    },
  ];

  for (const tipo of tipos) {
    const [tipoSociedad] = await TipoSociedadModel.findOrCreate({
      where: { codTipoSociedad: tipo.codTipoSociedad },
      defaults: { ...tipo },
    });

    const nombreVar =
      "var" +
      stringFormat.sanitizeAndCapitalizeVar(tipoSociedad.codTipoSociedad);

    const varExistente = await VariableModel.findOne({
      where: { nomVariable: nombreVar },
    });

    if (!varExistente) {
      await VariableModel.create({
        nomVariable: nombreVar,
        valorVariable: tipoSociedad.idTipoSociedad.toString(),
        tipoVariable: "int",
        descVariable: tipoSociedad.descTipoSociedad,
      });
    }
  }
};
