import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback de Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    session: false,
  }),
  AuthController.googleCallback
);

router.get("/failure", (req, res) => {
  res
    .status(401)
    .json({ success: false, message: "Fallo en la autenticación con Google" });
});

export default router;
