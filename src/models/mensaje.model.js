import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Mensaje = sequelize.define(
  "Mensaje",
  {
    idMensaje: {
      type: DataTypes.INTEGER,
      field: "Id_Mensaje",
      primaryKey: true,
      autoIncrement: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    idChat: {
      type: DataTypes.INTEGER,
      field: "Id_Chat",
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      field: "Mensaje",
      allowNull: true,
    },
    estadoMensaje: {
      type: DataTypes.BOOLEAN,
      field: "Est_Mensaje",
      allowNull: false,
      defaultValue: false,
    },
    fechaHora: {
      type: DataTypes.DATE,
      field: "Fecha_Hora",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    vigenciaMensaje: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Mensaje",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Mensaje",
    timestamps: false,
  }
);

export default Mensaje;
