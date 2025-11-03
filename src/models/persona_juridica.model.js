import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PersonaJuridica = sequelize.define(
  "PersonaJuridica",
  {
    idPersonaJuridica: {
      type: DataTypes.INTEGER,
      field: "Id_PersonaJuridica",
      primaryKey: true,
      autoIncrement: true,
    },
    rucPersonaJuridica: {
      type: DataTypes.STRING(11),
      field: "Ruc_PersonaJuridica",
      allowNull: false,
    },
    razonSocial: {
      type: DataTypes.STRING(100),
      field: "Razon_Social",
      allowNull: false,
    },
    nomComercio: {
      type: DataTypes.STRING(100),
      field: "Nom_Comercio",
      allowNull: true,
    },
    idTipoSociedad: {
      type: DataTypes.INTEGER,
      field: "Id_TipoSociedad",
      allowNull: false,
    },
    telContacto: {
      type: DataTypes.STRING(11),
      field: "Tel_Contacto",
      allowNull: true,
    },
    dirLegal: {
      type: DataTypes.STRING(150),
      field: "Dir_Legal",
      allowNull: false,
    },
    idDistrito: {
      type: DataTypes.INTEGER,
      field: "Id_Distrito",
      allowNull: false,
    },
    webEmpresarial: {
      type: DataTypes.STRING(200),
      field: "Web_Empresarial",
      allowNull: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    vigenciaPersonaJuridica: {
      type: DataTypes.BOOLEAN,
      field: "Vig_PersonaJuridica",
      allowNull: false,
      defaultValue: true,
    },
  },
  { tableName: "PersonaJuridica", timestamps: false }
);
export default PersonaJuridica;
