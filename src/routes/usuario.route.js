import { Router } from "express";
import { body, param } from "express-validator";
import * as UsuarioController from "../controllers/usuario.controller.js";
import { handleErrors } from "../middlewares/validate.js";
import { uploadArchivosMemory } from "../config/multer.js";

const router = Router();

router.get("/", UsuarioController.list);
router.get(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  UsuarioController.get
);

router.post(
  "/",
  uploadArchivosMemory.single("portafolio"),
  body("idTipoPersona")
    .notEmpty()
    .withMessage("El tipo persona es obligatirio")
    .isInt({ gt: 0 })
    .withMessage("ID invalido"),
  body("emailUsuario")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido"),
  body("passwordUsuario")
    .notEmpty()
    .withMessage("La contrasella es obligatoria"),
  body("docIdentidad")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .matches(/^[0-9]+$/)
    .withMessage("El DNI debe contener solo dígitos")
    .isLength({ min: 8, max: 8 })
    .withMessage("El DNI debe tener 8 dígitos"),
  body("rucPersonaNatural")
    .if(body("idTipoPersona").equals("1"))
    .optional({ checkFalsy: true })
    .matches(/^[0-9]+$/)
    .withMessage("El RUC debe contener solo dígitos")
    .isLength({ min: 11, max: 11 })
    .withMessage("El RUC debe tener 11 dígitos"),
  body("nomPersona")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  body("apePersona")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("Los apellidos son obligatorio"),
  body("fechaNacimiento")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .bail()
    .isISO8601()
    .withMessage(
      "La fecha de nacimiento debe tener un formato válido (YYYY-MM-DD)"
    )
    .custom((value) => {
      const fechaNacimiento = new Date(value);
      const hoy = new Date();
      if (fechaNacimiento > hoy) {
        throw new Error("La fecha de nacimiento no puede ser futura");
      }
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      const dia = hoy.getDate() - fechaNacimiento.getDate();

      const tiene18 =
        edad > 18 || (edad === 18 && (mes > 0 || (mes === 0 && dia >= 0)));

      if (!tiene18) {
        throw new Error("Debe ser mayor de 18 años");
      }

      return true;
    }),
  body("telPersona")
    .if(body("idTipoPersona").equals("1"))
    .optional({ checkFalsy: true })
    .matches(/^[0-9]+$/)
    .withMessage("El Telefono debe contener solo dígitos"),
  body("celPersona")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("El celular es obligatorio")
    .matches(/^[0-9]+$/)
    .withMessage("El celular debe contener solo dígitos"),
  body("dirPersona")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("La direccion es obligatoria"),
  body("rucPersonaJuridica")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("El RUC es obligatorio")
    .matches(/^[0-9]+$/)
    .withMessage("El RUC debe contener solo dígitos")
    .isLength({ min: 11, max: 11 })
    .withMessage("El RUC debe tener 11 dígitos"),
  body("razonSocial")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("La razon social es obligatoria"),
  body("dirLegal")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("La direccion legal es obligatoria"),
  body("nomRepresentante")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("El nombre del representante es obligatorio"),
  body("idTipoSociedad")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("El tipo de sociedad es requerido"),
  body("apeRepresentante")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("Los apellidos del representante son obligatorios"),
  body("cargoRepresentante")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("El cargo es obligatorio"),
  body("idDistrito")
    .isInt({ gt: 0 })
    .withMessage("ID invalido")
    .notEmpty()
    .withMessage("El ubigeo es obligatorio"),

  handleErrors,
  UsuarioController.create
);

router.post(
  "/login",
  body("emailUsuario")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido"),
  body("passwordUsuario")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
  handleErrors,
  UsuarioController.login
);

router.get(
  "/:id/usubyperfil",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  UsuarioController.usuariosByPerfil
);

router.delete(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  UsuarioController.remove
);

router.patch(
  "/:id/toggle",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  UsuarioController.toggleEstado
);
router.put(
  "/:id/restore",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  UsuarioController.restorePassword
);
router.post(
  "/verification-code",
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no tiene un formato válido"),
  handleErrors,
  UsuarioController.sendVerificationCode
);

router.post(
  "/validate-user",
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no tiene un formato válido"),
  body("codigo").notEmpty().withMessage("Código obligatorio"),
  handleErrors,
  UsuarioController.validarUsuario
);

router.post(
  "/restore-password",
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no tiene un formato válido"),
  body("nuevopassword").notEmpty().withMessage("El password es obligatorio"),
  handleErrors,
  UsuarioController.cambiarPassword
);

router.put(
  "/:id/update-usergoogle",
  uploadArchivosMemory.single("portafolio"),
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  body("idTipoPersona")
    .notEmpty()
    .withMessage("El tipo persona es obligatorio")
    .isInt({ gt: 0 })
    .withMessage("ID invalido"),
  body("passwordUsuario")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
  body("docIdentidad")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .matches(/^[0-9]+$/)
    .withMessage("El DNI debe contener solo dígitos")
    .isLength({ min: 8, max: 8 })
    .withMessage("El DNI debe tener 8 dígitos"),
  body("rucPersonaNatural")
    .if(body("idTipoPersona").equals("1"))
    .optional({ checkFalsy: true })
    .matches(/^[0-9]+$/)
    .withMessage("El RUC debe contener solo dígitos")
    .isLength({ min: 11, max: 11 })
    .withMessage("El RUC debe tener 11 dígitos"),
  body("nomPersona")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  body("apePersona")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("Los apellidos son obligatorio"),
  body("fechaNacimiento")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .bail()
    .isISO8601()
    .withMessage(
      "La fecha de nacimiento debe tener un formato válido (YYYY-MM-DD)"
    )
    .custom((value) => {
      const fechaNacimiento = new Date(value);
      const hoy = new Date();
      if (fechaNacimiento > hoy) {
        throw new Error("La fecha de nacimiento no puede ser futura");
      }
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      const dia = hoy.getDate() - fechaNacimiento.getDate();

      const tiene18 =
        edad > 18 || (edad === 18 && (mes > 0 || (mes === 0 && dia >= 0)));

      if (!tiene18) {
        throw new Error("Debe ser mayor de 18 años");
      }

      return true;
    }),
  body("telPersona")
    .if(body("idTipoPersona").equals("1"))
    .optional({ checkFalsy: true })
    .matches(/^[0-9]+$/)
    .withMessage("El Telefono debe contener solo dígitos"),
  body("celPersona")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("El celular es obligatorio")
    .matches(/^[0-9]+$/)
    .withMessage("El celular debe contener solo dígitos"),
  body("dirPersona")
    .if(body("idTipoPersona").equals("1"))
    .notEmpty()
    .withMessage("La direccion es obligatoria"),
  body("rucPersonaJuridica")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("El RUC es obligatorio")
    .matches(/^[0-9]+$/)
    .withMessage("El RUC debe contener solo dígitos")
    .isLength({ min: 11, max: 11 })
    .withMessage("El RUC debe tener 11 dígitos"),
  body("razonSocial")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("La razon social es obligatoria"),
  body("dirLegal")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("La direccion legal es obligatoria"),
  body("nomRepresentante")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("El nombre del representante es obligatorio"),
  body("idTipoSociedad")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("El tipo de sociedad es requerido"),
  body("apeRepresentante")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("Los apellidos del representante son obligatorios"),
  body("cargoRepresentante")
    .if(body("idTipoPersona").equals("2"))
    .notEmpty()
    .withMessage("El cargo es obligatorio"),
  body("idDistrito")
    .isInt({ gt: 0 })
    .withMessage("ID invalido")
    .notEmpty()
    .withMessage("El ubigeo es obligatorio"),
  handleErrors,
  UsuarioController.actualizarUsuarioGoogle
);

export default router;
