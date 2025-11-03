import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const TipoSocieddad = sequelize.define(
  "TipoSociedad",
  {
    idTipoSociedad: {
      type: DataTypes.INTEGER,
      field: "Id_TipoSociedad",
      primaryKey: true,
      autoIncrement: true,
    },
    codTipoSociedad: {
      type: DataTypes.STRING(10),
      field: "Cod_TipoSociedad",
      allowNull: false,
    },
    descTipoSociedad: {
      type: DataTypes.STRING(100),
      field: "Desc_TipoSociedad",
      allowNull: false,
    },
    vigenciaTipoSociedad: {
      type: DataTypes.BOOLEAN,
      field: "Vig_TipoSociedad",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "TipoSociedad",
    timestamps: false,
  }
);
export default TipoSocieddad;
