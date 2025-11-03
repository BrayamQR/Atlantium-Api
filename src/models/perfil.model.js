import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Perfil = sequelize.define(
  "Perfil",
  {
    idPerfil: {
      type: DataTypes.INTEGER,
      field: "Id_Perfil",
      primaryKey: true,
      autoIncrement: true,
    },
    nomPerfil: {
      type: DataTypes.STRING(50),
      field: "Nom_Perfil",
      allowNull: false,
    },
    descPerfil: {
      type: DataTypes.STRING,
      field: "Desc_Perfil",
      allowNull: true,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      field: "Fecha_Creacion",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    estadoPerfil: {
      type: DataTypes.BOOLEAN,
      field: "Est_Perfil",
      allowNull: false,
      defaultValue: true,
    },
    vigenciaPerfil: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Perfil",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Perfil",
    timestamps: false,
  }
);

export default Perfil;
