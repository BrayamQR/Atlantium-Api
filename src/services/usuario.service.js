import * as UsuarioRepository from "../repositories/usuario.repository.js";
import UsuarioDTO from "../dtos/usuario.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import * as VariablesRepository from "../repositories/variable.repository.js";
import * as PerfilRepository from "../repositories/perfil.repository.js";
import * as ArchivoRepository from "../repositories/archivo.repository.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import stringFormat from "../utils/stringFormat.js";
import { saveArchivoToDisk, deleteArchivoFromDisk } from "../config/multer.js";
import * as TipoPersonaRepository from "../repositories/tipopersona.repository.js";
import sequelize from "../config/db.js";

/**
 * Lista todos los usuarios en la base de datos
 * @returns {Promise<UsuarioDTO[]>}
 */

export const list = async () => {
  const usuarios = await UsuarioRepository.list();
  return usuarios.map((p) => new UsuarioDTO(p));
};

/**
 * Obtiene un usuario por su ID
 * @param {number} id - ID del usuario
 * @returns {Promise<UsuarioDTO|null>}
 */

export const get = async (id) => {
  const usuario = await UsuarioRepository.get(id);
  return usuario ? new UsuarioDTO(usuario) : null;
};

/**
 * Registra un nuevo usuario
 * @param {{
 *   nroIdentificacion: string,
 *   nomUsuario: string,
 *   apeUsuario: string,
 *   emailUsuario: string,
 *   telefonoUsuario: string,
 *   passwordUsuario: string,
 *   direccionUsuario?: string,
 *   tipoCliente?: string,
 *   cipUsuario?: string,
 *   especialidadUsuario?: string,
 *   portafolioUsuario?: string,
 *   idPerfil: number
 * }} data
 * @returns {Promise<UsuarioDTO>}
 */

export const create = async (data, portafolio) => {
  const transaction = await sequelize.transaction();
  let archivoGuardado = null;

  try {
    data = sanitizeData(data);
    if (data.emailUsuario)
      data.emailUsuario = stringFormat.toLowerCaseText(data.emailUsuario);
    if (data.passwordUsuario)
      data.passwordUsuario = stringFormat.toLowerCaseText(data.passwordUsuario);
    if (data.nomPersona)
      data.nomPersona = stringFormat.capitalizeAuto(data.nomPersona);
    if (data.apePersona)
      data.apePersona = stringFormat.capitalizeAuto(data.apePersona);
    if (data.dirPersona)
      data.dirPersona = stringFormat.capitalizeAuto(data.dirPersona);
    if (data.espeProfesional)
      data.espeProfesional = stringFormat.capitalizeAuto(data.espeProfesional);
    if (data.razonSocial)
      data.razonSocial = stringFormat.capitalizeAuto(data.razonSocial);
    if (data.nomComercio)
      data.nomComercio = stringFormat.capitalizeAuto(data.nomComercio);
    if (data.dirLegal)
      data.dirLegal = stringFormat.capitalizeAuto(data.dirLegal);
    if (data.nomRepresentante)
      data.nomRepresentante = stringFormat.capitalizeAuto(
        data.nomRepresentante
      );
    if (data.apeRepresentante)
      data.apeRepresentante = stringFormat.capitalizeAuto(
        data.apeRepresentante
      );
    if (data.emailRepresentante)
      data.emailRepresentante = stringFormat.toLowerCaseText(
        data.emailRepresentante
      );
    if (data.cargoRepresentante)
      data.cargoRepresentante = stringFormat.capitalizeAuto(
        data.cargoRepresentante
      );
    if (data.webEmpresarial)
      data.webEmpresarial = stringFormat.toLowerCaseText(data.webEmpresarial);

    data.idTipoPersona = parseInt(data.idTipoPersona, 10);
    data.idPerfil = data.idPerfil ? parseInt(data.idPerfil, 10) : null;
    data.idDistrito = data.idDistrito ? parseInt(data.idDistrito, 10) : null;

    const emailExists = await UsuarioRepository.findByEmail(data.emailUsuario);

    if (emailExists) {
      throw new ValidationError(
        "El email ya esta registrado",
        ERROR_CODES.EMAIL_EXISTS
      );
    }
    if (data.docIdentidad) {
      const docIdentExist = await TipoPersonaRepository.findPNByDocIdentidad(
        data.docIdentidad
      );
      if (docIdentExist) {
        throw new ValidationError(
          "El DNI ya esta registrado",
          ERROR_CODES.NRO_IDENT_EXISTS
        );
      }
    }

    if (data.rucPersonaNatural) {
      const rucPersonaExist =
        await TipoPersonaRepository.findPNByRucPersonaNatural(
          data.rucPersonaNatural
        );

      if (rucPersonaExist) {
        throw new ValidationError(
          "El RUC ya está registrado",
          ERROR_CODES.RUC_EXIST
        );
      }
    }

    if (data.rucPersonaJuridica) {
      const rucPersonaExist =
        await TipoPersonaRepository.findPJByRucPersonaJuridica(
          data.rucPersonaJuridica
        );

      if (rucPersonaExist) {
        throw new ValidationError(
          "El RUC ya está registrado",
          ERROR_CODES.RUC_EXIST
        );
      }
    }

    let idPerfilFinal = data.idPerfil;
    if (!idPerfilFinal) {
      const varCliente = await VariablesRepository.findByName("varCliente");
      if (!varCliente) {
        throw new ValidationError(
          "Variable global 'varCliente' no encontrada",
          ERROR_CODES.VAR_NOT_FOUND
        );
      }
      if (varCliente.tipoVariable !== "int" || !varCliente.valorVariable) {
        throw new ValidationError(
          "Variable global 'varCliente' inválida",
          ERROR_CODES.VAR_INVALID
        );
      }
      idPerfilFinal = parseInt(varCliente.valorVariable, 10);
    }

    const hashedPassword = await bcrypt.hash(data.passwordUsuario, 10);

    const usuarioData = {
      idTipoPersona: data.idTipoPersona,
      emailUsuario: data.emailUsuario,
      passwordUsuario: hashedPassword,
      idPerfil: idPerfilFinal,
    };

    const usuario = await UsuarioRepository.create(usuarioData, {
      transaction,
    });

    if (data.idTipoPersona === 1) {
      const personaNaturalData = {
        docIdentidad: data.docIdentidad,
        rucPersonaNatural: data.rucPersonaNatural,
        nomPersona: data.nomPersona,
        apePersona: data.apePersona,
        fechaNacimiento: data.fechaNacimiento,
        telPersona: data.telPersona,
        celPersona: data.celPersona,
        dirPersona: data.dirPersona,
        idDistrito: data.idDistrito,
        cipProfesional: data.cipProfesional,
        espeProfesional: data.espeProfesional,
        idUsuario: usuario.idUsuario,
      };

      const personaNatural = await TipoPersonaRepository.createPN(
        personaNaturalData,
        { transaction }
      );

      if (portafolio) {
        archivoGuardado = saveArchivoToDisk(portafolio);

        const archivoData = {
          nombreArchivo: archivoGuardado.nombreArchivo,
          rutaArchivo: archivoGuardado.rutaArchivo,
          idPersonaNatural: personaNatural.idPersonaNatural,
        };

        await ArchivoRepository.create(archivoData, { transaction });
      }
    }

    if (data.idTipoPersona === 2) {
      const personaJuridicaData = {
        rucPersonaJuridica: data.rucPersonaJuridica,
        razonSocial: data.razonSocial,
        nomComercio: data.nomComercio,
        idTipoSociedad: data.idTipoSociedad,
        telContacto: data.telContacto,
        dirLegal: data.dirLegal,
        idDistrito: data.idDistrito,
        webEmpresarial: data.webEmpresarial,
        idUsuario: usuario.idUsuario,
      };

      const personaJuridica = await TipoPersonaRepository.createPJ(
        personaJuridicaData,
        { transaction }
      );
      if (data.nomRepresentante) {
        const representanteLegalData = {
          docIdentidad: data.docIdentidad,
          nomRepresentante: data.nomRepresentante,
          apeRepresentante: data.apeRepresentante,
          celContacto: data.celContacto,
          emailRepresentante: data.emailRepresentante,
          cargoRepresentante: data.cargoRepresentante,
          idPersonaJuridica: personaJuridica.idPersonaJuridica,
        };

        await TipoPersonaRepository.createRL(representanteLegalData, {
          transaction,
        });
      }
    }
    await transaction.commit();
    return new UsuarioDTO(usuario);
  } catch (error) {
    await transaction.rollback();
    if (archivoGuardado) {
      deleteArchivoFromDisk(archivoGuardado.rutaArchivo);
    }
    throw error;
  }
};

export const update = async (id, data) => {
  const transaction = await sequelize.transaction();

  try {
    data = sanitizeData(data);

    if (data.emailUsuario)
      data.emailUsuario = stringFormat.toLowerCaseText(data.emailUsuario);

    if (data.passwordUsuario)
      data.passwordUsuario = stringFormat.toLowerCaseText(data.passwordUsuario);
    if (data.passwordActual)
      data.passwordActual = stringFormat.toLowerCaseText(data.passwordActual);

    const usuario = await UsuarioRepository.get(id);

    if (!usuario) {
      throw new ValidationError(
        "Usuario no encontrado",
        ERROR_CODES.USER_NOT_FOUND
      );
    }
    if (data.emailUsuario && usuario.emailUsuario !== data.emailUsuario) {
      const emailExists = await UsuarioRepository.findByEmail(
        data.emailUsuario
      );

      if (emailExists) {
        throw new ValidationError(
          "El email ya esta registrado",
          ERROR_CODES.EMAIL_EXISTS
        );
      }

      const dataUsuario = {
        emailUsuario: data.emailUsuario,
        emailVerificado: false,
        googleId: null,
      };
      await UsuarioRepository.update(id, dataUsuario, { transaction });
    }

    if (data.passwordUsuario) {
      if (!data.passwordActual) {
        throw new ValidationError(
          "Se requiere contraseña actual",
          ERROR_CODES.INVALID_PASSWORD
        );
      }

      const passwordValid = await bcrypt.compare(
        data.passwordActual,
        usuario.passwordUsuario
      );

      if (!passwordValid) {
        throw new ValidationError(
          "Contraseña incorrecta",
          ERROR_CODES.INVALID_PASSWORD
        );
      }

      const hashedPassword = await bcrypt.hash(data.passwordUsuario, 10);

      const dataUsuario = {
        passwordUsuario: hashedPassword,
      };

      await UsuarioRepository.update(id, dataUsuario, { transaction });
    }

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const actualizarUsuarioGoogle = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    data = sanitizeData(data);
    if (data.passwordUsuario)
      data.passwordUsuario = stringFormat.toLowerCaseText(data.passwordUsuario);
    if (data.nomPersona)
      data.nomPersona = stringFormat.capitalizeAuto(data.nomPersona);
    if (data.apePersona)
      data.apePersona = stringFormat.capitalizeAuto(data.apePersona);
    if (data.dirPersona)
      data.dirPersona = stringFormat.capitalizeAuto(data.dirPersona);
    if (data.espeProfesional)
      data.espeProfesional = stringFormat.capitalizeAuto(data.espeProfesional);
    if (data.razonSocial)
      data.razonSocial = stringFormat.capitalizeAuto(data.razonSocial);
    if (data.nomComercio)
      data.nomComercio = stringFormat.capitalizeAuto(data.nomComercio);
    if (data.dirLegal)
      data.dirLegal = stringFormat.capitalizeAuto(data.dirLegal);
    if (data.nomRepresentante)
      data.nomRepresentante = stringFormat.capitalizeAuto(
        data.nomRepresentante
      );
    if (data.apeRepresentante)
      data.apeRepresentante = stringFormat.capitalizeAuto(
        data.apeRepresentante
      );
    if (data.emailRepresentante)
      data.emailRepresentante = stringFormat.toLowerCaseText(
        data.emailRepresentante
      );
    if (data.cargoRepresentante)
      data.cargoRepresentante = stringFormat.capitalizeAuto(
        data.cargoRepresentante
      );

    data.idTipoPersona = parseInt(data.idTipoPersona, 10);
    data.idDistrito = data.idDistrito ? parseInt(data.idDistrito, 10) : null;

    if (data.docIdentidad) {
      const docIdentExist = await TipoPersonaRepository.findPNByDocIdentidad(
        data.docIdentidad
      );
      if (docIdentExist) {
        throw new ValidationError(
          "El numero de indentificación ya esta registrado",
          ERROR_CODES.NRO_IDENT_EXISTS
        );
      }
    }

    if (data.rucPersonaNatural) {
      const rucPersonaExist =
        await TipoPersonaRepository.findPNByRucPersonaNatural(
          data.rucPersonaNatural
        );

      if (rucPersonaExist) {
        throw new ValidationError(
          "El RUC ya está registrado",
          ERROR_CODES.RUC_EXIST
        );
      }
    }

    if (data.rucPersonaJuridica) {
      const rucPersonaExist =
        await TipoPersonaRepository.findPJByRucPersonaJuridica(
          data.rucPersonaJuridica
        );

      if (rucPersonaExist) {
        throw new ValidationError(
          "El RUC ya está registrado",
          ERROR_CODES.RUC_EXIST
        );
      }
    }

    const hashedPassword = await bcrypt.hash(data.passwordUsuario, 10);

    const usuarioData = {
      idTipoPersona: data.idTipoPersona,
      passwordUsuario: hashedPassword,
    };

    const usuario = await UsuarioRepository.update(id, usuarioData, {
      transaction,
    });

    if (data.idTipoPersona === 1) {
      const personaNaturalData = {
        docIdentidad: data.docIdentidad,
        rucPersonaNatural: data.rucPersonaNatural,
        nomPersona: data.nomPersona,
        apePersona: data.apePersona,
        fechaNacimiento: data.fechaNacimiento,
        telPersona: data.telPersona,
        celPersona: data.celPersona,
        dirPersona: data.dirPersona,
        idDistrito: data.idDistrito,
        cipProfesional: data.cipProfesional,
        espeProfesional: data.espeProfesional,
        idUsuario: usuario.idUsuario,
      };

      const personaNatural = await TipoPersonaRepository.createPN(
        personaNaturalData,
        { transaction }
      );
    }

    if (data.idTipoPersona === 2) {
      const personaJuridicaData = {
        rucPersonaJuridica: data.rucPersonaJuridica,
        razonSocial: data.razonSocial,
        nomComercio: data.nomComercio,
        idTipoSociedad: data.idTipoSociedad,
        telContacto: data.telContacto,
        dirLegal: data.dirLegal,
        idDistrito: data.idDistrito,
        webEmpresarial: data.webEmpresarial,
        idUsuario: usuario.idUsuario,
      };

      const personaJuridica = await TipoPersonaRepository.createPJ(
        personaJuridicaData,
        { transaction }
      );
      if (data.nomRepresentante) {
        const representanteLegalData = {
          docIdentidad: data.docIdentidad,
          nomRepresentante: data.nomRepresentante,
          apeRepresentante: data.apeRepresentante,
          celContacto: data.celContacto,
          emailRepresentante: data.emailRepresentante,
          cargoRepresentante: data.cargoRepresentante,
          idPersonaJuridica: personaJuridica.idPersonaJuridica,
        };

        await TipoPersonaRepository.createRL(representanteLegalData, {
          transaction,
        });
      }
    }
    await transaction.commit();

    const usuarioCompleto = await UsuarioRepository.get(usuario.idUsuario);

    const nombreUsuario = usuarioCompleto.personaNatural
      ? `${usuarioCompleto.personaNatural.nomPersona} ${usuarioCompleto.personaNatural.apePersona}`
      : usuarioCompleto.personaJuridica?.razonSocial ||
        usuarioCompleto.emailUsuario;

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 20px; color: white; text-align: center;">
          <h2>¡Bienvenido, ${nombreUsuario || "Usuario"}!</h2>
        </div>
        <div style="padding: 30px; color: #333;">
          <p>Nos alegra tenerte en <b>Atlantium</b>.</p>
          <p>Ya puedes acceder a la plataforma y comenzar a utilizar todos nuestros servicios.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              process.env.FRONTEND_URL
            }" style="background-color: #007bff; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none;">Ir al sistema</a>
          </div>
        </div>
      </div>
    </div>
  `;

    await sendEmail({
      from: `"Atlantium Notificaciones" <${process.env.EMAIL_USER}>`,
      to: usuarioCompleto.emailUsuario,
      subject: "¡Bienvenido a Atlantium!",
      htmlContent: htmlContent,
    });

    return new UsuarioDTO(usuarioCompleto);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Realiza el login de un usuario
 * @param {string} emailUsuario
 * @param {string} password
 * @returns {Promise<{token: string, usuario: UsuarioDTO}>}
 */

export const login = async (data) => {
  data = sanitizeData(data);
  if (data.emailUsuario)
    data.emailUsuario = stringFormat.toLowerCaseText(data.emailUsuario);
  if (data.passwordUsuario)
    data.passwordUsuario = stringFormat.toLowerCaseText(data.passwordUsuario);
  const usuario = await UsuarioRepository.findByEmail(data.emailUsuario);
  if (!usuario) {
    throw new ValidationError(
      "Usuario no encontrado",
      ERROR_CODES.USER_NOT_FOUND
    );
  }

  if (!usuario.estadoUsuario) {
    throw new ValidationError(
      "El usuario deshabilitado, comuniquese con soporte técnico.",
      ERROR_CODES.DISABLED_USER
    );
  }

  const passwordValid = await bcrypt.compare(
    data.passwordUsuario,
    usuario.passwordUsuario
  );
  if (!passwordValid) {
    throw new ValidationError(
      "Contraseña incorrecta",
      ERROR_CODES.INVALID_PASSWORD
    );
  }

  const payload = {
    idUsuario: usuario.idUsuario,
    idPerfil: usuario.idPerfil,
    nomUsuario: usuario.nomUsuario,
    emailUsuario: usuario.emailUsuario,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    usuario: new UsuarioDTO(usuario),
  };
};

export const usuariosByPerfil = async (id) => {
  const perfil = await PerfilRepository.get(id);
  if (!perfil) {
    throw new ValidationError(
      "Perfil no encontrado",
      ERROR_CODES.PROFILE_NOT_FOUND
    );
  }

  const usuarios = await UsuarioRepository.usuariosByPerfil(id);
  return usuarios ? usuarios.map((p) => new UsuarioDTO(p)) : null;
};

export const remove = async (id) => {
  const usuario = await UsuarioRepository.get(id);

  if (!usuario) {
    throw new ValidationError(
      "El usuario no existe o ya fue eliminado",
      ERROR_CODES.USER_NOT_FOUND
    );
  }
  const usuarioDTO = new UsuarioDTO(usuario);
  try {
    if (usuarioDTO.personaNatural) {
      await TipoPersonaRepository.updatePN(
        usuarioDTO.personaNatural.idPersonaNatural,
        { vigenciaPerNatural: false }
      );

      if (usuarioDTO.personaNatural?.archivo) {
        try {
          deleteArchivoFromDisk(usuarioDTO.personaNatural.archivo.rutaArchivo);
        } catch (err) {
          console.warn(
            "⚠️ No se pudo eliminar el archivo físico:",
            err.message
          );
        }
      }
    } else if (usuarioDTO.personaJuridica) {
      await TipoPersonaRepository.updatePJ(
        usuarioDTO.personaJuridica.idPersonaJuridica,
        { vigenciaPersonaJuridica: false }
      );

      if (usuarioDTO.personaJuridica.representanteLegal) {
        await TipoPersonaRepository.updateRL(
          usuarioDTO.personaJuridica.representanteLegal.idRepresentante,
          { vigenciaRepresentanteLegal: false }
        );
      }
    }
    return UsuarioRepository.remove(id);
  } catch (error) {
    console.error("⚠️ Error al actualizar vigencias:", error);
    throw error;
  }
};

export const toggleEstado = async (id) => {
  const usuario = await UsuarioRepository.get(id);
  if (!usuario) return null;
  const nuevoEstado = !usuario.estadoUsuario;
  const actualizado = await UsuarioRepository.update(id, {
    estadoUsuario: nuevoEstado,
  });
  return new UsuarioDTO(actualizado);
};

export const restorePassword = async (id) => {
  try {
    const usuario = await UsuarioRepository.get(id);
    if (!usuario) throw new Error("Usuario no encontrado");

    let nuevopassword = null;

    if (usuario.personaNatural?.docIdentidad) {
      nuevopassword = usuario.personaNatural.docIdentidad;
    } else if (usuario.personaJuridica?.rucPersonaJuridica) {
      nuevopassword = usuario.personaJuridica.rucPersonaJuridica;
    }

    if (!nuevopassword) {
      throw new Error("No se pudo determinar una contraseña para el usuario");
    }

    const hashedPassword = await bcrypt.hash(nuevopassword, 10);

    const actualizado = await UsuarioRepository.update(id, {
      passwordUsuario: hashedPassword,
    });

    return new UsuarioDTO(actualizado);
  } catch (error) {
    console.error("Error al restaurar contraseña:", error.message);
    throw error;
  }
};

export const sendVerificationCode = async (email) => {
  try {
    const usuario = await UsuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new ValidationError(
        "El usuario no existe o ya fue eliminado",
        ERROR_CODES.USER_NOT_FOUND
      );
    }

    let nombreMostrar = "Usuario";
    if (usuario.idTipoPersona === 1 && usuario.personaNatural) {
      nombreMostrar = `${usuario.personaNatural.nomPersona} ${usuario.personaNatural.apePersona}`;
    } else if (usuario.idTipoPersona === 2 && usuario.personaJuridica) {
      nombreMostrar = usuario.personaJuridica.razonSocial;
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const expiraEn = new Date(Date.now() + 15 * 60 * 1000);

    await UsuarioRepository.update(usuario.idUsuario, {
      codigoRecuperacion: codigo,
      tiempoExpira: expiraEn,
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Encabezado -->
          <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0;">🔐 Verificación de cuenta</h2>
          </div>

          <!-- Cuerpo -->
          <div style="padding: 30px; color: #333;">
            <p>Hola <b>${nombreMostrar}</b>,</p>
            <p>Gracias por registrarte en <b>Atlantium</b>. Para continuar con la verificación de tu cuenta, usa el siguiente código:</p>

            <div style="text-align: center; margin: 30px 0;">
              <div style="font-size: 36px; font-weight: bold; color: #007bff; letter-spacing: 6px;">
                ${codigo}
              </div>
            </div>

            <p>Este código expirará en <b>15 minutos</b>.</p>
            <p>Si no solicitaste esta verificación, puedes ignorar este mensaje.</p>
          </div>

          <!-- Pie -->
          <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Atlantium. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      from: `"Atlantium Soporte" <${process.env.EMAIL_USER}>`,
      to: usuario.emailUsuario,
      subject: "Código de verificación de cuenta",
      htmlContent: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Error al enviar el codigo:", error.message);
    throw error;
  }
};

export const verifyCode = async (email, codigo) => {
  try {
    const usuario = await UsuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new ValidationError(
        "El usuario no existe o ya fue eliminado",
        ERROR_CODES.USER_NOT_FOUND
      );
    }
    const codigoValido =
      usuario.codigoRecuperacion === codigo &&
      usuario.tiempoExpira &&
      new Date(usuario.tiempoExpira) > new Date();

    if (!codigoValido) {
      throw new Error("Código inválido o expirado");
    }

    return true;
  } catch (error) {
    console.error("Error al restaurar contraseña:", error.message);
    throw error;
  }
};

export const validarUsuario = async (email, codigo) => {
  try {
    await verifyCode(email, codigo);
    const usuario = await UsuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new ValidationError(
        "El usuario no existe o ya fue eliminado",
        ERROR_CODES.USER_NOT_FOUND
      );
    }

    await UsuarioRepository.update(usuario.idUsuario, {
      emailVerificado: true,
      codigoRecuperacion: null,
      tiempoExpira: null,
    });

    const nombreUsuario = usuario.personaNatural
      ? `${usuario.personaNatural.nomPersona} ${usuario.personaNatural.apePersona}`
      : usuario.personaJuridica?.razonSocial || usuario.emailUsuario;

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 20px; color: white; text-align: center;">
          <h2>¡Bienvenido, ${nombreUsuario || "Usuario"}!</h2>
        </div>
        <div style="padding: 30px; color: #333;">
          <p>Nos alegra tenerte en <b>Atlantium</b>.</p>
          <p>Ya puedes acceder a la plataforma y comenzar a utilizar todos nuestros servicios.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              process.env.FRONTEND_URL
            }" style="background-color: #007bff; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none;">Ir al sistema</a>
          </div>
        </div>
      </div>
    </div>
  `;

    await sendEmail({
      from: `"Atlantium Notificaciones" <${process.env.EMAIL_USER}>`,
      to: usuario.emailUsuario,
      subject: "¡Bienvenido a Atlantium!",
      htmlContent: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Error al validar usuario:", error.message);
    throw error;
  }
};

export const cambiarPassword = async (email, nuevopassword) => {
  try {
    const usuario = await UsuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new ValidationError(
        "El usuario no existe o ya fue eliminado",
        ERROR_CODES.USER_NOT_FOUND
      );
    }

    const hashedPassword = await bcrypt.hash(nuevopassword, 10);

    await UsuarioRepository.update(usuario.idUsuario, {
      passwordUsuario: hashedPassword,
    });

    return true;
  } catch (error) {
    console.error("Error al validar usuario:", error.message);
    throw error;
  }
};

export const findByEmail = async (email) => {
  const usuario = await UsuarioRepository.findByEmail(email);
  if (!usuario) {
    throw new ValidationError(
      "Usuario no encontrado",
      ERROR_CODES.USER_NOT_FOUND
    );
  }
  return usuario ? new UsuarioDTO(usuario) : null;
};
