import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Archivo = sequelize.define(
  "Archivo",
  {
    idArchivo: {
      type: DataTypes.INTEGER,
      field: "Id_Archivo",
      primaryKey: true,
      autoIncrement: true,
    },
    nombreArchivo: {
      type: DataTypes.STRING,
      field: "Nombre_Archivo",
      allowNull: false,
    },
    rutaArchivo: {
      type: DataTypes.STRING,
      field: "Ruta_Archivo",
      allowNull: false,
    },
    idTramite: {
      type: DataTypes.INTEGER,
      field: "Id_Tramite",
      allowNull: true,
    },
    idSolicitud: {
      type: DataTypes.INTEGER,
      field: "Id_Solicitud",
      allowNull: true,
    },
    idMensaje: {
      type: DataTypes.INTEGER,
      field: "Id_Mensaje",
      allowNull: true,
    },
    idPersonaNatural: {
      type: DataTypes.INTEGER,
      field: "Id_PersonaNatural",
      allowNull: true,
    },
    vigenciaArchivo: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Archivo",
      allowNull: false,
      defaultValue: true,
    },
  },
  { tableName: "Archivo", timestamps: false }
);

export default Archivo;
