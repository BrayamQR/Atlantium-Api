import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Pago = sequelize.define(
  "Pago",
  {
    idPago: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "Id_Pago",
    },
    idTramite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Id_Tramite",
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "Id_Usuario",
    },
    idEstadoPago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: "Id_EstadoPago",
    },
    montoPago: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Monto_Pago",
    },
    descPago: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "Desc_Pago",
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "Fecha_Creacion",
    },
    fechaPago: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "Fecha_Pago",
    },
    mpPaymentId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Mp_Payment_Id",
      comment: "ID del pago en Mercado Pago",
    },
    mpStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Mp_Status",
      comment: "Estado del pago en Mercado Pago (approved, rejected, etc.)",
    },
    mpPaymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Mp_Payment_Method",
      comment: "Método de pago usado (visa, master, yape, etc.)",
    },
    mpRawResponse: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "Mp_Raw_Response",
      comment: "Respuesta completa del API de Mercado Pago (para auditoría)",
    },
    vigenciaPago: {
      type: DataTypes.BOOLEAN,
      field: "Vig_Pago",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Pago",
    timestamps: false,
  }
);

export default Pago;
