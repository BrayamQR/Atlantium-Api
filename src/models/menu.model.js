import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Menu = sequelize.define(
  "Menu",
  {
    idMenu: {
      type: DataTypes.INTEGER,
      field: "Id_Menu",
      primaryKey: true,
      autoIncrement: true,
    },
    tituloMenu: {
      type: DataTypes.STRING,
      field: "Titulo_Menu",
      allowNull: false,
    },
    pathMenu: {
      type: DataTypes.STRING,
      field: "Path_Menu",
      allowNull: false,
    },
    ordenMenu: {
      type: DataTypes.INTEGER,
      field: "Orden_Menu",
      allowNull: false,
    },
    idMenuPadre: {
      type: DataTypes.INTEGER,
      field: "Id_MenuPadre",
      allowNull: false,
      defaultValue: 0,
    },
    iconDefMenu: {
      type: DataTypes.STRING,
      field: "Icon_DefMenu",
      allowNull: true,
    },
    iconActMenu: {
      type: DataTypes.STRING,
      field: "Icon_ActMenu",
      allowNull: true,
    },
    vigenciaMenu: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Menu",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Menu",
    timestamps: false,
  }
);

export default Menu;
