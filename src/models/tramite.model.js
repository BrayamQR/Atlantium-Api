import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Tramite = sequelize.define(
  "Tramite",
  {
    idTramite: {
      type: DataTypes.INTEGER,
      field: "Id_Tramite",
      primaryKey: true,
      autoIncrement: true,
    },
    codTramite: {
      type: DataTypes.STRING,
      field: "Cod_Tramite",
      allowNull: true,
    },
    tipoTramite: {
      type: DataTypes.STRING,
      field: "Tipo_Tramite",
      allowNull: false,
    },
    descTramite: {
      type: DataTypes.STRING,
      field: "Desc_Tramite",
      allowNull: true,
    },
    fechaEmision: {
      type: DataTypes.DATE,
      field: "Fecha_Emision",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fechaLimite: {
      type: DataTypes.DATE,
      field: "Fecha_Limite",
      allowNull: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    idEtapa: {
      type: DataTypes.INTEGER,
      field: "Id_Etapa",
      allowNull: false,
      defaultValue: 0,
    },
    vigenciaTramite: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Tramite",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Tramite",
    timestamps: false,
  }
);
export default Tramite;
