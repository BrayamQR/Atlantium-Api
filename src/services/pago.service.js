import * as PagoRepository from "../repositories/pago.repository.js";
import Pago from "../dtos/pago.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import stringFormat from "../utils/stringFormat.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import * as UsuaroRepository from "../repositories/usuario.repository.js";
import * as VariablesRepository from "../repositories/variable.repository.js";
import { preferenceClient } from "../config/mercadopago.config.js";
import sequelize from "../config/db.js";
import * as TramiteRepository from "../repositories/tramite.repository.js";
import { sendEmail } from "../utils/sendEmail.js";

export const create = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    data = sanitizeData(data);
    if (data.idTramite) data.idTramite = parseInt(data.idTramite, 10);
    if (data.idUsuario) data.idUsuario = parseInt(data.idUsuario, 10);
    if (data.montoPago) data.montoPago = parseFloat(data.montoPago);
    if (data.descPago)
      data.descPago = stringFormat.capitalizeSentence(data.descPago);

    const pago = await PagoRepository.create(data, {
      transaction,
    });
    await transaction.commit();

    const tramiteCompleto = await TramiteRepository.get(pago.idTramite);

    const nombreUsuario = tramiteCompleto.usuario.personaNatural
      ? `${tramiteCompleto.usuario.personaNatural.nomPersona} ${tramiteCompleto.usuario.personaNatural.apePersona}`
      : tramiteCompleto.usuario.personaJuridica?.razonSocial ||
        tramiteCompleto.usuario.emailUsuario;

    const htmlContent = `
          <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    
              <!-- Encabezado -->
              <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 25px; color: white; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">✅ Monto a pagar asignado</h2>
              </div>
    
              <!-- Cuerpo -->
              <div style="padding: 30px; color: #333; line-height: 1.6;">
                <p>Hola <b>${nombreUsuario}</b>,</p>
                <p>Tu monto a pagar por el tramite ${
                  tramiteCompleto.tipoTramite
                } a sido generado correctamente en <b>Atlantium</b>.</p>
                <p><b>Código del trámite:</b> <span style="color: #007bff; font-weight: bold;">${
                  tramiteCompleto.codTramite
                }</span></p>
                <p><b>Monto asignado:</b> S/. ${pago.montoPago.toFixed(2)}</p>
                ${
                  pago.descPago
                    ? `<p><b>Concepto:</b> ${pago.descPago}</p>`
                    : "No detallado"
                }

                <p>Puedes acceder al sistema para revisar los detalles y seguir el estado de tu trámite.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${
                    process.env.FRONTEND_URL
                  }" style="background-color: #007bff; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold;">Ir al sistema</a>
                </div>
              </div>
    
              <!-- Pie -->
              <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                <p>© ${new Date().getFullYear()} Atlantium. Todos los derechos reservados.</p>
              </div>
    
            </div>
          </div>
        `;

    await sendEmail({
      from: `"Atlantium Notificaciones" <${process.env.EMAIL_USER}>`,
      to: tramiteCompleto.usuario.emailUsuario,
      subject: "¡Pago emitido!",
      htmlContent: htmlContent,
    });

    return new Pago.PagoDTO(pago);
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }

    throw error;
  }
};

export const list = async () => {
  const pagos = await PagoRepository.list();
  return pagos.map((p) => new Pago.TramitesByPagoDTO(p));
};

export const get = async (id) => {
  const pago = await PagoRepository.get(id);
  return pago ? new Pago.TramitesByPagoDTO(pago) : null;
};

export const findAllState = async () => {
  const estados = await PagoRepository.findAllState();
  return estados.map((e) => new Pago.EstadoPagoDTO(e));
};

export const listPagosByUsuario = async (id) => {
  const usuario = await UsuaroRepository.get(id);
  if (!usuario) {
    throw new ValidationError(
      "Usuario no encontrado",
      ERROR_CODES.USER_NOT_FOUND
    );
  }
  const varAdmin = await VariablesRepository.findByName("varAdministrador");

  let esAdministrador = false;
  if (varAdmin && varAdmin.tipoVariable === "int") {
    esAdministrador = usuario.idPerfil === parseInt(varAdmin.valorVariable, 10);
  }

  let pagos;
  if (esAdministrador) {
    pagos = await PagoRepository.list();
  } else {
    pagos = await PagoRepository.findByUsuario(usuario.idUsuario);
  }

  return pagos ? pagos.map((p) => new Pago.TramitesByPagoDTO(p)) : null;
};

export const update = async (id, data) => {
  data = sanitizeData(data);

  const pago = await PagoRepository.update(id, data);

  return pago ? new Pago.PagoDTO(pago) : null;
};

export const crearPreferencia = async (monto, descripcion, idPago) => {
  try {
    const preferenceData = {
      items: [
        {
          title: descripcion || "Producto de prueba",
          quantity: 1,
          currency_id: "PEN",
          unit_price: parseFloat(monto) || 100,
        },
      ],
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pago-exitoso`,
        failure: `${process.env.FRONTEND_URL}/pago-fallido`,
        pending: `${process.env.FRONTEND_URL}/pago-pendiente`,
      },
      auto_return: "approved",
      notification_url: `${process.env.BACKEND_URL}/api/pay/notificacion`,
      external_reference: idPago.toString(),
      payment_methods: { installments: 1 },
    };

    const response = await preferenceClient.create({ body: preferenceData });

    return {
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    };
  } catch (error) {
    console.error("❌ Error creando preferencia:", error);
    throw new Error("No se pudo crear la preferencia de pago.");
  }
};

export const notificacion = async (paymentId) => {
  const transaction = await sequelize.transaction();
  try {
    const payment = await obtenerDetallePago(paymentId);
    const idPago = parseInt(payment.external_reference, 10);

    const varPagado = await VariablesRepository.findByName("varPagado");

    if (!varPagado) {
      throw new ValidationError(
        "Variable global 'varPagado' no encontrada",
        ERROR_CODES.VAR_NOT_FOUND
      );
    }

    const pagoActual = await PagoRepository.get(idPago);
    if (!pagoActual) throw new Error("Pago no encontrado");

    if (pagoActual.idEstadoPago === parseInt(varPagado.valorVariable, 10)) {
      console.log("Pago ya notificado, no se envía correo nuevamente");
      return true;
    }

    const data = {
      idEstadoPago: parseInt(varPagado.valorVariable, 10),
      fechaPago: payment.date_approved,
      mpPaymentId: payment.id,
      mpStatus: payment.status,
      mpPaymentMethod: payment.payment_method_id,
      mpRawResponse: JSON.stringify(payment, null, 2),
    };

    const pagoActualizado = await PagoRepository.update(idPago, data, {
      transaction,
    });
    await transaction.commit();

    const tramiteCompleto = await PagoRepository.get(idPago);

    const nombreUsuario = tramiteCompleto.usuario.personaNatural
      ? `${tramiteCompleto.usuario.personaNatural.nomPersona} ${tramiteCompleto.usuario.personaNatural.apePersona}`
      : tramiteCompleto.usuario.personaJuridica?.razonSocial ||
        tramiteCompleto.usuario.emailUsuario;

    const htmlContent = `
          <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    
              <!-- Encabezado -->
              <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 25px; color: white; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">✅ Pago realizado exitosamente</h2>
              </div>
    
              <!-- Cuerpo -->
              <div style="padding: 30px; color: #333; line-height: 1.6;">
                <p>Hola <b>${nombreUsuario}</b>,</p>
                <p>Tu pago ha sido registrado correctamente en <b>Atlantium</b>.</p>
                <p><b>Código del trámite:</b> <span style="color: #007bff; font-weight: bold;">${
                  tramiteCompleto.codTramite
                }</span></p>
                <p><b>Monto:</b> S/. ${tramiteCompleto.pago.montoPago.toFixed(
                  2
                )}</p>
                ${
                  tramiteCompleto.pago.descPago
                    ? `<p><b>Concepto:</b> ${tramiteCompleto.pago.descPago}</p>`
                    : "No detallado"
                }

                <p>Puedes acceder al sistema para revisar los detalles y seguir el estado de tu trámite.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${
                    process.env.FRONTEND_URL
                  }" style="background-color: #007bff; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold;">Ir al sistema</a>
                </div>

                <p style="font-size: 12px; color: #777; margin-top: 20px;">
                  Si no realizaste esta acción, por favor contacta a nuestro soporte inmediatamente.
                </p>
              </div>
    
              <!-- Pie -->
              <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                <p>© ${new Date().getFullYear()} Atlantium. Todos los derechos reservados.</p>
              </div>
    
            </div>
          </div>
        `;

    await sendEmail({
      from: `"Atlantium Notificaciones" <${process.env.EMAIL_USER}>`,
      to: tramiteCompleto.usuario.emailUsuario,
      subject: "¡Pago realizado!",
      htmlContent: htmlContent,
    });

    return true;
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }

    throw error;
  }
};

async function obtenerDetallePago(paymentId) {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener el pago: ${response.statusText}`);
  }

  return await response.json();
}
