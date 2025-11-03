import EtapaModel from "../models/etapa.model.js";
import VariableModel from "../models/variablesglobales.model.js";
import stringFormat from "../utils/stringFormat.js";

export const seedEtapa = async () => {
  const etapas = [
    {
      descEtapa: "Inicio",
      catEtapa: 1,
      estiloEtapa: "bg-amber-700 dark:bg-amber-400",
    },
    {
      descEtapa: "Creado",
      catEtapa: 1,
      estiloEtapa: "bg-sky-700 dark:bg-sky-400",
    },
    {
      descEtapa: "En revisión",
      catEtapa: 1,
      estiloEtapa: "bg-indigo-700 dark:bg-indigo-400",
    },
    {
      descEtapa: "Aprobado",
      catEtapa: 1,
      estiloEtapa: "bg-green-700 dark:bg-green-400",
    },
    {
      descEtapa: "En proceso",
      catEtapa: 1,
      estiloEtapa: "bg-blue-700 dark:bg-blue-400",
    },
    {
      descEtapa: "Finalizado",
      catEtapa: 1,
      estiloEtapa: "bg-emerald-700 dark:bg-emerald-400",
    },
  ];

  for (const etapa of etapas) {
    const [etapaTramite] = await EtapaModel.findOrCreate({
      where: {
        descEtapa: etapa.descEtapa,
      },
      defaults: { ...etapa },
    });

    const nombreVar =
      "var" + stringFormat.sanitizeAndCapitalizeVar(etapaTramite.descEtapa);

    const varExistente = await VariableModel.findOne({
      where: { nomVariable: nombreVar },
    });

    if (!varExistente) {
      await VariableModel.create({
        nomVariable: nombreVar,
        valorVariable: etapaTramite.idEtapa.toString(),
        tipoVariable: "int",
        descVariable: `Variable global para la etapa del tramite ${etapaTramite.descEtapa}`,
      });
    }
  }
};
