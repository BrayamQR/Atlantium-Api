import * as EncargadoRepository from "../repositories/encargado.repository.js";
import * as TramiteRepository from "../repositories/tramite.repository.js";
import * as UsuarioRepository from "../repositories/usuario.repository.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import EncargadoDTO from "../dtos/encargado.dto.js";
import sequelize from "../config/db.js";
import { sendEmail } from "../utils/sendEmail.js";

export const insertEncargadoTramite = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No se recibieron encargados para insertar");
    }
    const validData = [];
    let tramite;
    let usuario;
    for (const item of data) {
      tramite = await TramiteRepository.get(item.idTramite);
      if (!tramite) {
        throw new ValidationError(
          "Tramite no encontrado",
          ERROR_CODES.PROCESS_NOT_FOUND
        );
      }

      usuario = await UsuarioRepository.get(item.idUsuario);
      if (!usuario) {
        throw new ValidationError(
          "Usuario no encontrado",
          ERROR_CODES.USER_NOT_FOUND
        );
      }

      const existing = await EncargadoRepository.findByTramiteAndUsuario(
        item.idTramite,
        item.idUsuario
      );

      if (existing) {
        if (existing.vigenciaEncargado !== item.vigenciaEncargado) {
          existing.vigenciaEncargado = item.vigenciaEncargado;
          await existing.save();
        }
      } else if (item.vigenciaEncargado) {
        validData.push({
          idTramite: item.idTramite,
          idUsuario: item.idUsuario,
        });
      }
    }

    const encargado = await EncargadoRepository.bulkCreate(validData, {
      transaction,
    });
    await transaction.commit();

    const nombreUsuario = tramite.usuario.personaNatural
      ? `${tramite.usuario.personaNatural.nomPersona} ${tramite.usuario.personaNatural.apePersona}`
      : tramite.usuario.personaJuridica?.razonSocial ||
        tramite.usuario.emailUsuario;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

          <!-- Encabezado -->
          <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 25px; color: white; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">✅ Profesional asignado</h2>
          </div>

          <!-- Cuerpo -->
          <div style="padding: 30px; color: #333; line-height: 1.6;">
            <p>Hola <b>${nombreUsuario}</b>,</p>
            <p>Se asigno a un profesional al tramite: <b>${
              tramite.tipoTramite
            }</b>.</p>
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

    const nombreUsuarioEncargado = usuario.personaNatural
      ? `${usuario.personaNatural.nomPersona} ${usuario.personaNatural.apePersona}`
      : usuario.personaJuridica?.razonSocial || usuario.emailUsuario;

    const htmlContentEncargado = `
      <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

          <!-- Encabezado -->
          <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 25px; color: white; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">✅ Asignacion de tramites</h2>
          </div>

          <!-- Cuerpo -->
          <div style="padding: 30px; color: #333; line-height: 1.6;">
            <p>Hola <b>${nombreUsuarioEncargado}</b>,</p>
            <p>Se te ha asignado el siguiente tramite: <b>${
              tramite.tipoTramite
            }</b>.</p>
            <p>Puedes acceder al sistema para revisar los detalles y validar la información del tramite.</p>

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
      to: tramite.usuario.emailUsuario,
      subject: "¡Profesional asignado!",
      htmlContent: htmlContent,
    });

    await sendEmail({
      from: `"Atlantium Notificaciones" <${process.env.EMAIL_USER}>`,
      to: usuario.emailUsuario,
      subject: "¡Asignación de tramites!",
      htmlContent: htmlContentEncargado,
    });

    return new EncargadoDTO(encargado);
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }

    throw error;
  }
};

export const listEncargadosByTramite = async (id) => {
  const tramite = await TramiteRepository.get(id);
  if (!tramite) {
    throw new ValidationError(
      "Tramite no encontrad",
      ERROR_CODES.PROCESS_NOT_FOUND
    );
  }

  const encargados = await EncargadoRepository.fingByTramite(id);

  return encargados ? encargados.map((e) => new EncargadoDTO(e)) : null;
};
