import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const VariablesGlobales = sequelize.define(
  "VariablesGlobales",
  {
    idVariable: {
      type: DataTypes.INTEGER,
      field: "Id_Variable",
      primaryKey: true,
      autoIncrement: true,
    },
    nomVariable: {
      type: DataTypes.STRING(100),
      field: "Nom_Variable",
      allowNull: false,
    },
    valorVariable: {
      type: DataTypes.STRING,
      field: "Valor_Variable",
      allowNull: false,
    },
    tipoVariable: {
      type: DataTypes.STRING,
      field: "Tipo_Variable",
      allowNull: false,
    },
    descVariable: {
      type: DataTypes.STRING,
      field: "Desc_Variable",
      allowNull: true,
    },
    vigenciaVariable: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Variable",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "VariablesGlobales",
    timestamps: false,
  }
);

export default VariablesGlobales;
