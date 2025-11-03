import { Router } from "express";
import * as ChatController from "../controllers/chat.controller.js";
import { handleErrors } from "../middlewares/validate.js";
import { body, param } from "express-validator";
import { uploadArchivosMemory } from "../config/multer.js";

const router = Router();

router.get(
  "/:id/user",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  ChatController.findChatsByUsuario
);

router.get("/", ChatController.findAllChats);

router.get("/unread-message", ChatController.findChatsConMensajesNoLeidos);

router.get(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  ChatController.getChatById
);

router.post(
  "/",
  uploadArchivosMemory.array("archivos", 10),
  body("idEmisor").notEmpty().withMessage("El emisor es necesario"),
  body("idReceptor").notEmpty().withMessage("El receptor es necesario"),
  handleErrors,
  ChatController.createMensaje
);

router.delete(
  "/:id",
  param("id").isInt({ gt: 0 }).withMessage("ID inválido"),
  handleErrors,
  ChatController.remove
);

router.get(
  "/inter-user/:idEmisor/:idReceptor",
  param("idEmisor").isInt({ gt: 0 }).withMessage("ID invalido"),
  param("idReceptor").isInt({ gt: 0 }).withMessage("ID invalido"),
  handleErrors,
  ChatController.findChatBetweenUsuarios
);
router.patch(
  "/marcar-leidos",
  body("idChat").notEmpty().isInt(),
  body("idUsuario").notEmpty().isInt(),
  handleErrors,
  ChatController.marcarMensajesComoLeidos
);

router.get(
  "/:idChat/:idUsuario/no-leidos",
  param("idChat").isInt({ gt: 0 }).withMessage("ID de chat inválido"),
  param("idUsuario").isInt({ gt: 0 }).withMessage("ID de usuario inválido"),
  handleErrors,
  ChatController.getMensajesNoLeidosPorChat
);

// Cantidad total de mensajes no leídos de un usuario en todos sus chats
router.get(
  "/:idUsuario/no-leidos",
  param("idUsuario").isInt({ gt: 0 }).withMessage("ID de usuario inválido"),
  handleErrors,
  ChatController.getTotalMensajesNoLeidos
);

export default router;
