import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Observacion = sequelize.define(
  "Observacion",
  {
    idObservacion: {
      type: DataTypes.INTEGER,
      field: "Id_Observacion",
      primaryKey: true,
      autoIncrement: true,
    },
    descObservacion: {
      type: DataTypes.TEXT,
      field: "Desc_Observacion",
      allowNull: false,
    },
    idTramite: {
      type: DataTypes.INTEGER,
      field: "Id_Tramite",
      allowNull: true,
    },
    idEstado: {
      type: DataTypes.INTEGER,
      field: "Id_Estado",
      allowNull: false,
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
    vigenciaObservacion: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Observacion",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Observacion",
    timestamps: false,
  }
);

export default Observacion;
