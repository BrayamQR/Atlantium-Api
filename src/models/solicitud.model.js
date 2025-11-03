import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Solicitud = sequelize.define(
  "Solicitud",
  {
    idSolicitud: {
      type: DataTypes.INTEGER,
      field: "Id_Solicitud",
      primaryKey: true,
      autoIncrement: true,
    },
    asuntoSolicitud: {
      type: DataTypes.STRING(200),
      field: "Asunto_Solicitud",
      allowNull: false,
    },
    descSolicitud: {
      type: DataTypes.TEXT,
      field: "Desc_Solicitud",
      allowNull: false,
    },
    fechaEmision: {
      type: DataTypes.DATE,
      field: "Fecha_Emision",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    idTramite: {
      type: DataTypes.INTEGER,
      field: "Id_Tramite",
      allowNull: false,
    },
    vigenciaSolicitud: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Solicitud",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Solicitud",
    timestamps: false,
  }
);

export default Solicitud;
