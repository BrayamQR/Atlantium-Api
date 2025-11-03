import * as usuarioRepository from "../repositories/usuario.repository.js";
import * as VariablesRepository from "../repositories/variable.repository.js";
import UsuarioDTO from "../dtos/usuario.dto.js";
import { ValidationError } from "../utils/errors.js";
import { ERROR_CODES } from "../utils/errorCodes.js";

export const findOrCreateGoogleUser = async (profile) => {
  try {
    let usuario = await usuarioRepository.findByGoogleId(profile.id);

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
    let idPerfilFinal = parseInt(varCliente.valorVariable, 10);
    if (!usuario) {
      const email = profile.emails?.[0]?.value || profile.email;
      if (!email)
        throw new Error("No se encontró email en el perfil de Google");
      usuario = await usuarioRepository.findByEmail(email);

      if (usuario) {
        await usuarioRepository.update(usuario.idUsuario, {
          googleId: profile.id,
        });
        usuario.googleId = profile.id;
      } else {
        const usuarioData = {
          googleId: profile.id,
          emailUsuario: profile.emails?.[0]?.value || profile.email,
          emailVerificado: true,
          passwordUsuario: null,
          idPerfil: idPerfilFinal,
        };

        usuario = await usuarioRepository.create(usuarioData);
      }
    } else if (usuario.vigenciaUsuario === false) {
      await usuarioRepository.update(usuario.idUsuario, {
        vigenciaUsuario: true,
      });
      usuario.vigenciaUsuario = true;
    }
    return new UsuarioDTO(usuario);
  } catch (error) {
    console.error("❌ Error en findOrCreateGoogleUser:", error);
    throw error;
  }
};
