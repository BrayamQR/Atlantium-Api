import PerfilDTO from "./perfil.dto.js";
import TipoPersona from "./tipopersona.dto.js";

class UsuarioDTO {
  constructor({
    idUsuario,
    idTipoPersona,
    emailUsuario,
    fechaCreacion,
    estadoUsuario,
    googleId,
    emailVerificado,
    codigoRecuperacion,
    tiempoExpira,
    vigenciaUsuario,
    perfil,
    personaNatural,
    personaJuridica,
  }) {
    this.idUsuario = idUsuario;
    this.idTipoPersona = idTipoPersona;
    this.emailUsuario = emailUsuario;
    this.fechaCreacion = fechaCreacion;
    this.estadoUsuario = estadoUsuario;
    this.googleId = googleId;
    this.emailVerificado = emailVerificado;
    this.codigoRecuperacion = codigoRecuperacion;
    this.tiempoExpira = tiempoExpira;
    this.vigenciaUsuario = vigenciaUsuario;
    this.perfil = perfil ? new PerfilDTO(perfil) : null;
    this.personaNatural = personaNatural
      ? new TipoPersona.PersonaNaturalDTO(personaNatural)
      : null;

    this.personaJuridica = personaJuridica
      ? new TipoPersona.PersonaJuridicaDTO(personaJuridica)
      : null;
  }
}

export default UsuarioDTO;
