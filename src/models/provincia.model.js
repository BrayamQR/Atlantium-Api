import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Provincia = sequelize.define(
  "Provincia",
  {
    idProvincia: {
      type: DataTypes.INTEGER,
      field: "id_provincia",
      primaryKey: true,
      autoIncrement: true,
    },
    descProvincia: {
      type: DataTypes.STRING,
      field: "desc_provincia",
      allowNull: false,
    },
    idDepartamento: {
      type: DataTypes.INTEGER,
      field: "id_departamento",
      allowNull: false,
    },
  },
  {
    tableName: "Provincia",
    timestamps: false,
  }
);

export default Provincia;
