import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MenuByPerfil = sequelize.define(
  "MenuByPerfil",
  {
    idMenuByPerfil: {
      type: DataTypes.INTEGER,
      field: "Id_MenuByPerfil",
      primaryKey: true,
      autoIncrement: true,
    },
    idMenu: {
      type: DataTypes.INTEGER,
      field: "Id_Menu",
      allowNull: false,
    },
    idPerfil: {
      type: DataTypes.INTEGER,
      field: "Id_Perfil",
      allowNull: false,
    },
    vigenciaMenuByPerfil: {
      type: DataTypes.BOOLEAN,
      field: "Vig_MenuByPerfil",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "MenuByPerfil",
    timestamps: false,
  }
);

export default MenuByPerfil;
