import * as TramiteRepository from "../repositories/tramite.repository.js";
import * as ArchivoRepository from "../repositories/archivo.repository.js";
import * as UsuaroRepository from "../repositories/usuario.repository.js";
import * as VariablesRepository from "../repositories/variable.repository.js";
import * as ComentarioRepository from "../repositories/comentario.repository.js";
import * as SeguimientoRepository from "../repositories/seguimiento.repository.js";
import { sendEmail } from "../utils/sendEmail.js";
import TramiteDTO from "../dtos/tramite.dto.js";
import HistorialDTO from "../dtos/historial.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import stringFormat from "../utils/stringFormat.js";
import sequelize from "../config/db.js";
import { saveArchivoToDisk, deleteArchivoFromDisk } from "../config/multer.js";

export const create = async (data, archivosData = []) => {
  const transaction = await sequelize.transaction();
  let archivosGuardados = [];

  try {
    data = sanitizeData(data);

    if (data.tipoTramite)
      data.tipoTramite = stringFormat.capitalizeSentence(data.tipoTramite);

    if (data.descTramite)
      data.descTramite = stringFormat.capitalizeSentence(data.descTramite);

    let comentarios = [];
    if (data.comentarios) {
      if (typeof data.comentarios === "string") {
        comentarios = JSON.parse(data.comentarios);
      } else if (Array.isArray(data.comentarios)) {
        comentarios = data.comentarios;
      }
    }

    comentarios = comentarios.map((c) => stringFormat.capitalizeSentence(c));

    if (!data.fechaLimite) {
      const hoy = new Date();
      const fechaLimite = new Date(hoy);
      fechaLimite.setDate(hoy.getDate() + 7);
      data.fechaLimite = fechaLimite;
    }

    const tramiteData = {
      tipoTramite: data.tipoTramite,
      descTramite: data.descTramite,
      fechaLimite: data.fechaLimite,
      idEtapa: 1,
      idUsuario: data.idUsuario,
    };

    const tramite = await TramiteRepository.create(tramiteData, {
      transaction,
    });

    const anio = new Date().getFullYear();
    const codigoTramite = `TRM-${anio}-${tramite.idTramite}`;

    await TramiteRepository.update(
      tramite.idTramite,
      {
        codTramite: codigoTramite,
      },
      { transaction }
    );

    const seguimientoData = {
      idTramite: tramite.idTramite,
      idEtapa: 1,
      idUsuario: data.idUsuario,
    };

    const seguimiento = await SeguimientoRepository.create(seguimientoData, {
      transaction,
    });

    if (comentarios.length > 0) {
      const comentariosData = comentarios.map((c) => ({
        descComentario: typeof c === "string" ? c : c.texto,
        idTramite: tramite.idTramite,
        idUsuario: data.idUsuario,
      }));

      await ComentarioRepository.bulkCreate(comentariosData, { transaction });
    }

    if (archivosData.length > 0) {
      const archivosList = archivosData.map((archivo) => {
        const archivoGuardado = saveArchivoToDisk(archivo);
        archivosGuardados.push(archivoGuardado);

        return {
          nombreArchivo: archivoGuardado.nombreArchivo,
          rutaArchivo: archivoGuardado.rutaArchivo,
          idTramite: tramite.idTramite,
        };
      });

      await ArchivoRepository.bulkCreate(archivosList, { transaction });
    }

    await transaction.commit();

    const tramiteCompleto = await TramiteRepository.get(tramite.idTramite);

    const nombreUsuario = tramiteCompleto.usuario.personaNatural
      ? `${tramiteCompleto.usuario.personaNatural.nomPersona} ${tramiteCompleto.usuario.personaNatural.apePersona}`
      : tramiteCompleto.usuario.personaJuridica?.razonSocial ||
        tramiteCompleto.usuario.emailUsuario;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

          <!-- Encabezado -->
          <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 25px; color: white; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">✅ Trámite emitido exitosamente</h2>
          </div>

          <!-- Cuerpo -->
          <div style="padding: 30px; color: #333; line-height: 1.6;">
            <p>Hola <b>${nombreUsuario}</b>,</p>
            <p>Tu trámite ha sido registrado correctamente en <b>Atlantium</b>.</p>
            <p><b>Código del trámite:</b> <span style="color: #007bff; font-weight: bold;">${
              tramiteCompleto.codTramite
            }</span></p>
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
      subject: "¡Trámite emitido!",
      htmlContent: htmlContent,
    });

    return new TramiteDTO(tramite);
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    for (const a of archivosGuardados) {
      deleteArchivoFromDisk(a.rutaArchivo);
    }

    throw error;
  }
};

export const update = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    data = sanitizeData(data);

    if (data.tipoTramite)
      data.tipoTramite = stringFormat.capitalizeSentence(data.tipoTramite);

    if (data.descTramite)
      data.descTramite = stringFormat.capitalizeSentence(data.descTramite);

    const exists = await TramiteRepository.get(id);
    if (!exists) {
      throw new ValidationError(
        "Tramite no encontrado",
        ERROR_CODES.PROCESS_NOT_FOUND
      );
    }

    const { idUsuario, ...safeData } = data;

    const tramite = await TramiteRepository.update(id, safeData, {
      transaction,
    });

    if (data.idEtapa) {
      const seguimientoData = {
        idTramite: id,
        idEtapa: data.idEtapa,
        idUsuario: data.idUsuario,
      };

      const seguimiento = await SeguimientoRepository.create(seguimientoData, {
        transaction,
      });
    }
    await transaction.commit();

    if (data.idEtapa) {
      const tramiteCompleto = await TramiteRepository.get(id);

      const nombreUsuario = tramiteCompleto.usuario.personaNatural
        ? `${tramiteCompleto.usuario.personaNatural.nomPersona} ${tramiteCompleto.usuario.personaNatural.apePersona}`
        : tramiteCompleto.usuario.personaJuridica?.razonSocial ||
          tramiteCompleto.usuario.emailUsuario;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

            <!-- Encabezado -->
            <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 25px; color: white; text-align: center;">
              <h2 style="margin: 0; font-size: 24px;">✅ Progreso del tramite exitoso</h2>
            </div>

            <!-- Cuerpo -->
            <div style="padding: 30px; color: #333; line-height: 1.6;">
              <p>Hola <b>${nombreUsuario}</b>,</p>
              <p>¡Felicidades! el trámite <b>${
                tramiteCompleto.tipoTramite
              }</b> fue verificado y a progresado.</p>
              <p><b>Código del trámite:</b> <span style="color: #007bff; font-weight: bold;">${
                tramiteCompleto.codTramite
              }</span></p>
              <p><b>Etapa actual:</b> <span style="color: #007bff; font-weight: bold;">${
                tramiteCompleto.etapa.descEtapa
              }</span></p>
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
        subject: "¡Progreso exitoso del tramite!",
        htmlContent: htmlContent,
      });
    }

    return tramite ? new TramiteDTO(tramite) : null;
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }

    throw error;
  }
};

export const listTramitesByUsuario = async (id) => {
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
  let tramites;
  if (esAdministrador) {
    tramites = await TramiteRepository.list();
  } else {
    tramites = await TramiteRepository.findByUsuario(id);
  }

  return tramites ? tramites.map((t) => new TramiteDTO(t)) : null;
};

export const findByEncargado = async (id) => {
  const usuario = await UsuaroRepository.get(id);
  if (!usuario) {
    throw new ValidationError(
      "Usuario no encontrado",
      ERROR_CODES.USER_NOT_FOUND
    );
  }

  const tramites = await TramiteRepository.findByEncargado(usuario.idUsuario);
  return tramites ? tramites.map((t) => new TramiteDTO(t)) : null;
};

export const get = async (id) => {
  const tramite = await TramiteRepository.get(id);
  return tramite ? new TramiteDTO(tramite) : null;
};

export const historialCambios = async (id) => {
  const historial = [];

  try {
    const tramite = await TramiteRepository.get(id);

    if (tramite) {
      const nombreUsuario =
        tramite.usuario?.personaJuridica?.razonSocial ||
        tramite.usuario?.personaNatural?.nomPersona ||
        "usuario desconocido";

      historial.push(
        new HistorialDTO({
          tipoEvento: "Trámite registrado",
          descripcion: `Registró el trámite ${tramite.tipoTramite}.`,
          fecha: tramite.fechaEmision,
          usuario: nombreUsuario,
        })
      );
    }

    const comentarios = Array.isArray(tramite.comentario)
      ? tramite.comentario
      : [];

    comentarios.forEach((c) => {
      const nombreUsuario =
        c.usuario?.personaJuridica?.razonSocial ||
        c.usuario?.personaNatural?.nomPersona ||
        c.usuario?.emailUsuario ||
        "usuario desconocido";

      historial.push(
        new HistorialDTO({
          tipoEvento: "Comentario agregado",
          descripcion: `Comentó: "${c.descComentario}"`,
          fecha: c.fechaCreacion,
          usuario: nombreUsuario,
        })
      );
    });

    const observaciones = Array.isArray(tramite.observacion)
      ? tramite.observacion
      : [];

    observaciones.forEach((o) => {
      const nombreUsuario =
        o.usuario?.personaJuridica?.razonSocial ||
        o.usuario?.personaNatural?.nomPersona ||
        o.usuario?.emailUsuario ||
        "usuario desconocido";
      const tipoEvento =
        o.idEstado == 1
          ? "Observación agregada"
          : o.idEstado == 2
          ? "Observación resuelta"
          : "";

      historial.push(
        new HistorialDTO({
          tipoEvento: `${tipoEvento}`,
          descripcion: `Detalla: "${o.descObservacion}"`,
          fecha: o.fechaCreacion,
          usuario: nombreUsuario,
        })
      );
    });

    const solicitudes = Array.isArray(tramite.solicitud)
      ? tramite.solicitud
      : [];

    solicitudes.forEach((s) => {
      const nombreUsuario =
        s.usuario?.personaJuridica?.razonSocial ||
        s.usuario?.personaNatural?.nomPersona ||
        s.usuario?.emailUsuario ||
        "usuario desconocido";

      historial.push(
        new HistorialDTO({
          tipoEvento: "Solicitud agregada",
          descripcion: `Solicitud: "${s.asuntoSolicitud}" - ${s.descSolicitud}`,
          fecha: s.fechaEmision,
          usuario: nombreUsuario,
        })
      );
    });

    const encargados = Array.isArray(tramite.encargado)
      ? tramite.encargado
      : [];

    encargados.forEach((e) => {
      const nombreEncargado =
        e.usuario?.personaJuridica?.razonSocial ||
        e.usuario?.personaNatural?.nomPersona +
          " " +
          e.usuario?.personaNatural?.apePersona ||
        e.usuario?.emailUsuario ||
        "usuario desconocido";

      historial.push(
        new HistorialDTO({
          tipoEvento: "Profesional asignado",
          descripcion: `Se asignó el trámite a: Ing. ${nombreEncargado}`,
          fecha: e.fechaCreacion,
          usuario: "Administrador",
        })
      );
    });

    const seguimientos = Array.isArray(tramite.seguimiento)
      ? tramite.seguimiento
      : [];
    seguimientos.sort(
      (a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro)
    );

    for (let i = 1; i < seguimientos.length; i++) {
      const actual = seguimientos[i];
      const anterior = seguimientos[i - 1];
      if (actual.etapa.idEtapa !== 1) {
        const nombreUsuario =
          actual.usuario?.personaJuridica?.razonSocial ||
          actual.usuario?.personaNatural?.nomPersona ||
          actual.usuario?.emailUsuario ||
          "usuario desconocido";

        historial.push(
          new HistorialDTO({
            tipoEvento: "Etapa actualizada",
            descripcion: `Se actualizó la etapa del trámite de "${anterior.etapa.descEtapa}" a "${actual.etapa.descEtapa}".`,
            fecha: actual.fechaRegistro,
            usuario: nombreUsuario,
          })
        );
      }
    }

    if (tramite.pago && tramite.pago.vigenciaPago) {
      const montoFormateado = tramite.pago.montoPago.toFixed(2);

      historial.push(
        new HistorialDTO({
          tipoEvento: "Pago asignado",
          descripcion: `Se generó un pago por S/. ${montoFormateado}. Detalle: "${tramite.pago.descPago}"`,
          fecha: tramite.pago.fechaCreacion,
          usuario: "Administrador",
        })
      );
    }

    historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    return historial;
  } catch (error) {
    console.error("Error al obtener historial de cambios:", error);
    throw error;
  }
};

export const remove = async (id) => {
  return await TramiteRepository.remove(id);
};
