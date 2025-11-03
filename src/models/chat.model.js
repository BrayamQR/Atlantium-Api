import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Chat = sequelize.define(
  "Chat",
  {
    idChat: {
      type: DataTypes.INTEGER,
      field: "Id_Chat",
      primaryKey: true,
      autoIncrement: true,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      field: "Fecha_Creacion",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    vigenciaChat: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Chat",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Chat",
    timestamps: false,
  }
);
export default Chat;
