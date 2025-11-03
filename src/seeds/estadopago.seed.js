import EstadoPagoModel from "../models/estadopago.model.js";
import VariableModel from "../models/variablesglobales.model.js";
import stringFormat from "../utils/stringFormat.js";

export const seedEstadoPago = async () => {
  const estados = [
    {
      nomEstadoPago: "Pendiente",
      descEstadoPago: "El pago ha sido generado, pero aún no se ha completado.",
    },
    {
      nomEstadoPago: "Pagado",
      descEstadoPago: "El pago ha sido completado exitosamente.",
    },
    {
      nomEstadoPago: "Rechazado",
      descEstadoPago: "El pago fue rechazado o falló.",
    },
    {
      nomEstadoPago: "Anulado",
      descEstadoPago: "El pago fue cancelado o revertido manualmente.",
    },
  ];

  for (const estado of estados) {
    const [estadoPago] = await EstadoPagoModel.findOrCreate({
      where: {
        nomEstadoPago: estado.nomEstadoPago,
      },
      defaults: { ...estado },
    });

    const nombreVar =
      "var" + stringFormat.sanitizeAndCapitalizeVar(estadoPago.nomEstadoPago);

    const varExistente = await VariableModel.findOne({
      where: { nomVariable: nombreVar },
    });

    if (!varExistente) {
      await VariableModel.create({
        nomVariable: nombreVar,
        valorVariable: estadoPago.idEstadoPago.toString(),
        tipoVariable: "int",
        descVariable: estadoPago.descEstadoPago,
      });
    }
  }
};
