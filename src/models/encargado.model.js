import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Encargado = sequelize.define(
  "Encargado",
  {
    idEncargado: {
      type: DataTypes.INTEGER,
      field: "Id_Encargado",
      primaryKey: true,
      autoIncrement: true,
    },
    idTramite: {
      type: DataTypes.INTEGER,
      field: "Id_Tramite",
      allowNull: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      field: "Fecha_Creacion",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    vigenciaEncargado: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Encargado",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Encargado",
    timestamps: false,
  }
);

export default Encargado;
