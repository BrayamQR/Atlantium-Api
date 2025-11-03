import PerfilModel from "../models/perfil.model.js";
import VariableModel from "../models/variablesglobales.model.js";
import stringFormat from "../utils/stringFormat.js";

export const seedPerfil = async () => {
  const perfiles = [
    {
      nomPerfil: "Administrador",
      descPerfil: "Administrador del sistema",
    },
    {
      nomPerfil: "Profesional",
      descPerfil: "Perfil del profesional",
    },
    {
      nomPerfil: "Cliente",
      descPerfil: "Perfil del cliente comun",
    },
  ];

  for (const perfilData of perfiles) {
    const [perfil] = await PerfilModel.findOrCreate({
      where: { nomPerfil: perfilData.nomPerfil },
      defaults: perfilData,
    });

    const nombreVar =
      "var" + stringFormat.sanitizeAndCapitalizeVar(perfil.nomPerfil);
    const varExistente = await VariableModel.findOne({
      where: { nomVariable: nombreVar },
    });

    if (!varExistente) {
      await VariableModel.create({
        nomVariable: nombreVar,
        valorVariable: perfil.idPerfil.toString(),
        tipoVariable: "int",
        descVariable: `Variable global para el perfil ${perfil.nomPerfil}`,
      });
    }
  }
};
