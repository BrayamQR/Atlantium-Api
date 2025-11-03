import * as UsuarioService from "../services/usuario.service.js";
import { handleControllerError } from "../utils/errors.js";

export const list = async (req, res) => {
  try {
    const lstUsuario = await UsuarioService.list();
    res.json(lstUsuario);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioService.get(Number(id));
    if (!usuario) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o esta dado de baja" });
    }
    res.json(usuario);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const create = async (req, res) => {
  try {
    const portafolio = req.file;
    const usuario = await UsuarioService.create(req.body, portafolio);
    res.status(201).json(usuario);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const actualizarUsuarioGoogle = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioService.actualizarUsuarioGoogle(
      Number(id),
      req.body
    );
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await UsuarioService.login(data);
    res.status(200).json({
      message: `¡Bienvenido al sistema!`,
      user,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const usuariosByPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarios = await UsuarioService.usuariosByPerfil(id);
    res.json(usuarios);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UsuarioService.remove(Number(id));
    if (!response) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o ya eliminado" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const toggleEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioService.toggleEstado(Number(id));
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const restorePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioService.restorePassword(Number(id));
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    await UsuarioService.sendVerificationCode(email);
    res.status(200).json({ message: "Código enviado al correo." });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const validarUsuario = async (req, res) => {
  try {
    const { email, codigo } = req.body;
    await UsuarioService.validarUsuario(email, codigo);
    res.status(200).json({ message: "Usuario verificado exitosamente." });
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const cambiarPassword = async (req, res) => {
  try {
    const { email, nuevopassword } = req.body;
    await UsuarioService.cambiarPassword(email, nuevopassword);
    res.status(200).json({ message: "Contraseña modificada exitosamente." });
  } catch (error) {
    handleControllerError(res, error);
  }
};
