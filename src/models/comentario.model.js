import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Comentario = sequelize.define(
  "Comentario",
  {
    idComentario: {
      type: DataTypes.INTEGER,
      field: "Id_Comentario",
      primaryKey: true,
      autoIncrement: true,
    },
    descComentario: {
      type: DataTypes.TEXT,
      field: "Desc_Comentario",
      allowNull: false,
    },
    idTramite: {
      type: DataTypes.INTEGER,
      field: "Id_Tramite",
      allowNull: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: "Id_Usuario",
      allowNull: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      field: "Fecha_Creacion",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    vigenciaComentario: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Comentario",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Comentario",
    timestamps: false,
  }
);

export default Comentario;
