import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const EstadoPago = sequelize.define(
  "EstadoPago",
  {
    idEstadoPago: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "Id_EstadoPago",
    },
    nomEstadoPago: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: "Nom_EstadoPago",
    },
    descEstadoPago: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "Desc_EstadoPago",
    },
  },
  {
    tableName: "EstadoPago",
    timestamps: false,
  }
);

export default EstadoPago;
