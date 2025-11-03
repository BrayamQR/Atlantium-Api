import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UsuarioModel from "../models/usuario.model.js";
import * as authService from "../services/auth.service.js";

passport.serializeUser((user, done) => {
  done(null, user.idUsuario);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UsuarioModel.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_REDIRECT_URI ||
        "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await authService.findOrCreateGoogleUser(profile);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
