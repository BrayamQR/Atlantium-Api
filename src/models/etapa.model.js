import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Etapa = sequelize.define(
  "Etapa",
  {
    idEtapa: {
      type: DataTypes.INTEGER,
      field: "Id_Etapa",
      primaryKey: true,
      autoIncrement: true,
    },
    descEtapa: {
      type: DataTypes.STRING(50),
      field: "Desc_Etapa",
      allowNull: false,
    },
    catEtapa: {
      type: DataTypes.INTEGER,
      field: "Cat_Etapa",
      allowNull: false,
    },
    estiloEtapa: {
      type: DataTypes.STRING(50),
      field: "Style_Etapa",
      allowNull: true,
    },
    vigenciaEtapa: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Etapa",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Etapa",
    timestamps: false,
  }
);

export default Etapa;
