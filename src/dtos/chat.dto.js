import ArchivoDTO from "./archivo.dto.js";
import UsuarioDTO from "./usuario.dto.js";

export class ParticipanteDTO {
  constructor({ idParticipante, usuario, vigenciaParticipante }) {
    this.idParticipante = idParticipante;
    this.usuario = usuario ? new UsuarioDTO(usuario) : null;
    this.vigenciaParticipante = vigenciaParticipante;
  }
}

export class MensajeDTO {
  constructor({
    idMensaje,
    idUsuario,
    idChat,
    mensaje,
    fechaHora,
    estadoMensaje,
    archivo,
    vigenciaMensaje,
  }) {
    this.idMensaje = idMensaje;
    this.idUsuario = idUsuario;
    this.idChat = idChat;
    this.mensaje = mensaje ? mensaje : null;
    this.fechaHora = fechaHora;
    this.estadoMensaje = estadoMensaje;
    this.archivo = Array.isArray(archivo)
      ? archivo.map((a) => new ArchivoDTO(a))
      : [];
    this.vigenciaMensaje = vigenciaMensaje;
  }
}

export class ChatDTO {
  constructor({ idChat, participante, mensaje, fechaCreacion, vigenciaChat }) {
    this.idChat = idChat;
    this.participante = Array.isArray(participante)
      ? participante.map((p) => new ParticipanteDTO(p))
      : [];
    this.mensaje = Array.isArray(mensaje)
      ? mensaje.map((m) => new MensajeDTO(m))
      : [];
    this.fechaCreacion = fechaCreacion;
    this.vigenciaChat = vigenciaChat;
  }
}
