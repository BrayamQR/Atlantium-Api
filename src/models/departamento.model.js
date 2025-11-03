import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Departamento = sequelize.define(
  "Departamento",
  {
    idDepartamento: {
      type: DataTypes.INTEGER,
      field: "id_departamento",
      primaryKey: true,
      autoIncrement: true,
    },
    descDepartamento: {
      type: DataTypes.STRING,
      field: "desc_departamento",
      allowNull: false,
    },
  },
  {
    tableName: "Departamento",
    timestamps: false,
  }
);
export default Departamento;
