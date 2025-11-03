import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PersonaNatural = sequelize.define(
  "PersonaNatural",
  {
    idPersonaNatural: {
      type: DataTypes.INTEGER,
      field: "Id_PersonaNatural",
      primaryKey: true,
      autoIncrement: true,
    },
    docIdentidad: {
      type: DataTypes.STRING(8),
      field: "Doc_Identidad",
      allowNull: false,
    },
    rucPersonaNatural: {
      type: DataTypes.STRING(11),
      field: "Ruc_PersonaNatural",
      allowNull: true,
    },
    nomPersona: {
      type: DataTypes.STRING(100),
      field: "Nom_Persona",
      allowNull: false,
    },
    apePersona: {
      type: DataTypes.STRING(100),
      field: "Ape_Persona",
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      field: "Fecha_Nacimiento",
      allowNull: false,
    },
    telPersona: {
      type: DataTypes.STRING(11),
      field: "Tel_Persona",
      allowNull: true,
    },
    celPersona: {
      type: DataTypes.STRING(12),
      field: "Cel_Persona",
      allowNull: false,
    },
    dirPersona: {
      type: DataTypes.STRING(150),
      field: "Dir_Persona",
      allowNull: false,
    },
    idDistrito: {
      type: DataTypes.INTEGER,
      field: "Id_Distrito",
      allowNull: false,
    },
    cipProfesional: {
      type: DataTypes.STRING(12),
      field: "Cip_Profesional",
      allowNull: true,
    },
    espeProfesional: {
      type: DataTypes.STRING(100),
      field: "Espe_Profesinal",
      allowNull: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    vigenciaPerNatural: {
      type: DataTypes.BOOLEAN,
      field: "Vig_PersonaNatural",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "PersonaNatural",
    timestamps: false,
  }
);

export default PersonaNatural;
