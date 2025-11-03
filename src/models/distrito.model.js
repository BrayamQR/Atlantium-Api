import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Distrito = sequelize.define(
  "Distrito",
  {
    idDistrito: {
      type: DataTypes.INTEGER,
      field: "id_distrito",
      primaryKey: true,
      autoIncrement: true,
    },
    descDistrito: {
      type: DataTypes.STRING,
      field: "desc_distrito",
      allowNull: false,
    },
    idProvincia: {
      type: DataTypes.INTEGER,
      field: "id_provincia",
      allowNull: false,
    },
  },
  {
    tableName: "Distrito",
    timestamps: false,
  }
);
export default Distrito;
