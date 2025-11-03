import jwt from "jsonwebtoken";
import { handleControllerError } from "../utils/errors.js";
import * as UsuarioService from "../services/usuario.service.js";

export const googleCallback = async (req, res) => {
  try {
    const profile = req.user || req.usuario;

    if (!profile) {
      return res
        .status(401)
        .json({ success: false, message: "No autenticado" });
    }

    const email =
      profile.emailUsuario ||
      profile.email ||
      profile.emails?.[0]?.value ||
      profile._json?.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email no disponible en el perfil de Google",
      });
    }

    const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || "@gmail.com";
    if (!email.endsWith(allowedDomain)) {
      return res.status(403).json({
        success: false,
        message: `Correo no permitido. Solo ${allowedDomain}`,
      });
    }

    const usuario = await UsuarioService.findByEmail(email);

    const payload = {
      idUsuario: usuario.idUsuario,
      nomUsuario: usuario.nomUsuario,
      idPerfil: usuario.idPerfil,
      emailUsuario: usuario.emailUsuario,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4200";
    const redirectUrl = `${FRONTEND_URL.replace(
      /\/$/,
      ""
    )}/auth/google/callback?token=${encodeURIComponent(
      token
    )}&idUsuario=${encodeURIComponent(String(usuario.idUsuario))}`;
    return res.redirect(redirectUrl);
  } catch (error) {
    handleControllerError(res, error);
  }
};
