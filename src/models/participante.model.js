import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Participante = sequelize.define(
  "Participante",
  {
    idParticipante: {
      type: DataTypes.INTEGER,
      field: "Id_Participante",
      primaryKey: true,
      autoIncrement: true,
    },
    idChat: {
      type: DataTypes.INTEGER,
      field: "Id_Chat",
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    vigenciaParticipante: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Participante",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Participante",
    timestamps: false,
  }
);
export default Participante;
