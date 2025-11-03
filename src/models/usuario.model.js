import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      primaryKey: true,
      autoIncrement: true,
    },
    idTipoPersona: {
      type: DataTypes.INTEGER,
      field: "Id_TipoPersona",
      allowNull: true,
    },
    emailUsuario: {
      type: DataTypes.STRING(150),
      field: "Email_Usuario",
      allowNull: false,
    },
    passwordUsuario: {
      type: DataTypes.STRING,
      field: "Pass_Usuario",
      allowNull: true,
    },
    idPerfil: {
      type: DataTypes.INTEGER,
      field: "Id_Perfil",
      allowNull: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      field: "Fecha_Creacion",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    estadoUsuario: {
      type: DataTypes.BOOLEAN,
      field: "Est_Usuario",
      allowNull: false,
      defaultValue: true,
    },
    //Autenticacion y recuperacion

    googleId: {
      type: DataTypes.STRING,
      field: "Google_Id",
      allowNull: true,
    },
    emailVerificado: {
      type: DataTypes.BOOLEAN,
      field: "Email_Verificado",
      defaultValue: false,
      allowNull: false,
    },
    codigoRecuperacion: {
      type: DataTypes.STRING(8),
      field: "Cod_Recuperacion",
      allowNull: true,
    },
    tiempoExpira: {
      type: DataTypes.DATE,
      field: "Tiempo_Expira",
      allowNull: true,
    },
    vigenciaUsuario: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Usuario",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Usuario",
    timestamps: false,
  }
);

export default Usuario;
