import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Seguimiento = sequelize.define(
  "Seguimiento",
  {
    idSeguimiento: {
      type: DataTypes.INTEGER,
      field: "Id_Seguimiento",
      primaryKey: true,
      autoIncrement: true,
    },
    idTramite: {
      type: DataTypes.INTEGER,
      field: "Id_Tramite",
      allowNull: true,
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      field: "Fecha_Registro",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    idEtapa: {
      type: DataTypes.INTEGER,
      field: "Id_Etapa",
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    vigenciaSeguimiento: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Seguimiento",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Seguimiento",
    timestamps: false,
  }
);

export default Seguimiento;
