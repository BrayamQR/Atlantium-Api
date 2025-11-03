import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RepresentanteLegal = sequelize.define(
  "RepresentanteLegal",
  {
    idRepresentante: {
      type: DataTypes.INTEGER,
      field: "Id_Representante",
      primaryKey: true,
      autoIncrement: true,
    },
    docIdentidad: {
      type: DataTypes.STRING(8),
      field: "Doc_Identidad",
      allowNull: false,
    },
    nomRepresentante: {
      type: DataTypes.STRING(100),
      field: "Nom_Representante",
      allowNull: false,
    },
    apeRepresentante: {
      type: DataTypes.STRING(100),
      field: "Ape_Representante",
      allowNull: false,
    },
    celContacto: {
      type: DataTypes.STRING(12),
      field: "Cel_Contacto",
      allowNull: true,
    },
    emailRepresentante: {
      type: DataTypes.STRING(150),
      field: "Email_Contacto",
      allowNull: true,
    },
    cargoRepresentante: {
      type: DataTypes.STRING(150),
      field: "Cargo_Representante",
      allowNull: false,
    },
    idPersonaJuridica: {
      type: DataTypes.INTEGER,
      field: "Id_PersonaJuridica",
      allowNull: false,
    },
    vigenciaRepresentanteLegal: {
      type: DataTypes.BOOLEAN,
      field: "Vig_RepresentanteLegal",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "RepresentanteLegal",
    timestamps: false,
  }
);

export default RepresentanteLegal;
