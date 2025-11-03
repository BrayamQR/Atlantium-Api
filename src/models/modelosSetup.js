import Departamento from "./departamento.model.js";
import Distrito from "./distrito.model.js";
import Menu from "./menu.model.js";
import MenuByPerfil from "./menubyperfil.model.js";
import Perfil from "./perfil.model.js";
import PersonaJuridica from "./persona_juridica.model.js";
import Provincia from "./provincia.model.js";
import RepresentanteLegal from "./representante_legal.model.js";
import Solicitud from "./solicitud.model.js";
import Tramite from "./tramite.model.js";
import Usuario from "./usuario.model.js";
import PersonaNatural from "./persona_natural.model.js";
import Archivo from "./archivo.model.js";
import TipoSocieddad from "./tiposociedad.model.js";
import Comentario from "./comentario.model.js";
import Observacion from "./observacion.model.js";
import VariablesGlobales from "./variablesglobales.model.js";
import Etapa from "./etapa.model.js";
import Seguimiento from "./seguimiento.model.js";
import Encargado from "./encargado.model.js";
import Participante from "./participante.model.js";
import Mensaje from "./mensaje.model.js";
import Chat from "./chat.model.js";
import Pago from "./pago.model.js";
import EstadoPago from "./estadopago.model.js";

//Perfil - Usuario

Perfil.hasMany(Usuario, {
  foreignKey: "idPerfil",
  onDelete: "NO ACTION",
  as: "usuario",
});
Usuario.belongsTo(Perfil, {
  foreignKey: "idPerfil",
  onDelete: "NO ACTION",
  as: "perfil",
});

//Perfil - MenuByPerfil

Perfil.hasMany(MenuByPerfil, { foreignKey: "idPerfil", onDelete: "NO ACTION" });
MenuByPerfil.belongsTo(Perfil, {
  foreignKey: "idPerfil",
  onDelete: "NO ACTION",
});

//Menu - MenuByPerfil

Menu.hasMany(MenuByPerfil, { foreignKey: "idMenu", onDelete: "NO ACTION" });
MenuByPerfil.belongsTo(Menu, { foreignKey: "idMenu", onDelete: "NO ACTION" });

//Tramite - Archivo

Tramite.hasMany(Archivo, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "archivos",
});
Archivo.belongsTo(Tramite, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "tramite",
});

//Solicitud - Archivo

Solicitud.hasMany(Archivo, {
  foreignKey: "idSolicitud",
  onDelete: "NO ACTION",
  as: "archivos",
});

Archivo.belongsTo(Solicitud, {
  foreignKey: "idSolicitud",
  onDelete: "NO ACTION",
  as: "solicitud",
});

//Persona natural - Archivo

PersonaNatural.hasMany(Archivo, {
  foreignKey: "idPersonaNatural",
  onDelete: "NO ACTION",
  as: "archivo",
});

Archivo.belongsTo(PersonaNatural, {
  foreignKey: "idPersonaNatural",
  onDelete: "NO ACTION",
  as: "personaNatural",
});

//Usuario - Tramite

Usuario.hasMany(Tramite, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "tramite",
});
Tramite.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Usuario - Solicitud
Usuario.hasMany(Solicitud, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "solicitud",
});

Solicitud.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Tramite - Solicitud
Tramite.hasMany(Solicitud, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "solicitud",
});
Solicitud.belongsTo(Tramite, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "tramite",
});

//Usuario - Persona Natural

Usuario.hasOne(PersonaNatural, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "personaNatural",
});

PersonaNatural.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Usuario - Persona Juridica
Usuario.hasOne(PersonaJuridica, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "personaJuridica",
});

PersonaJuridica.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Persona Juridica - Rerpresentante Legal

PersonaJuridica.hasMany(RepresentanteLegal, {
  foreignKey: "idPersonaJuridica",
  onDelete: "NO ACTION",
  as: "representanteLegal",
});

RepresentanteLegal.belongsTo(PersonaJuridica, {
  foreignKey: "idPersonaJuridica",
  onDelete: "NO ACTION",
  as: "personaJuridica",
});

//Tramite - Observacion

Tramite.hasMany(Observacion, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "observacion",
});

Observacion.belongsTo(Tramite, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "tramite",
});

//Usuario - Observacion
Usuario.hasMany(Observacion, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "observacion",
});
Observacion.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Tramite - Comentario

Tramite.hasMany(Comentario, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "comentario",
});

Comentario.belongsTo(Tramite, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "tramite",
});

//Distrito - Persona Natural

Distrito.hasMany(PersonaNatural, {
  foreignKey: "idDistrito",
  onDelete: "NO ACTION",
  as: "personaNatural",
});

PersonaNatural.belongsTo(Distrito, {
  foreignKey: "idDistrito",
  onDelete: "NO ACTION",
  as: "distrito",
});

//Distrito - Persona juridica

Distrito.hasMany(PersonaJuridica, {
  foreignKey: "idDistrito",
  onDelete: "NO ACTION",
  as: "personaJuridica",
});

PersonaJuridica.belongsTo(Distrito, {
  foreignKey: "idDistrito",
  onDelete: "NO ACTION",
  as: "distrito",
});

//Provincia - Distrito

Provincia.hasMany(Distrito, {
  foreignKey: "idProvincia",
  onDelete: "NO ACTION",
  as: "distrito",
});
Distrito.belongsTo(Provincia, {
  foreignKey: "idProvincia",
  onDelete: "NO ACTION",
  as: "provincia",
});

//Departamento - Provincia

Departamento.hasMany(Provincia, {
  foreignKey: "idDepartamento",
  onDelete: "NO ACTION",
  as: "provincia",
});

Provincia.belongsTo(Departamento, {
  foreignKey: "idDepartamento",
  onDelete: "NO ACTION",
  as: "departamento",
});

//Tipo Sociedad - Persona Juridica

TipoSocieddad.hasMany(PersonaJuridica, {
  foreignKey: "idTipoSociedad",
  onDelete: "NO ACTION",
  as: "personaJuridica",
});

PersonaJuridica.belongsTo(TipoSocieddad, {
  foreignKey: "idTipoSociedad",
  onDelete: "NO ACTION",
  as: "tipoSociedad",
});

//Etapa- Tramite
Etapa.hasMany(Tramite, {
  foreignKey: "idEtapa",
  onDelete: "NO ACTION",
  as: "tramite",
});

Tramite.belongsTo(Etapa, {
  foreignKey: "idEtapa",
  onDelete: "NO ACTION",
  as: "etapa",
});

//Tramite - Encargado
Tramite.hasMany(Encargado, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "encargado",
});

Encargado.belongsTo(Tramite, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "tramite",
});

//Usuario - Encargado
Usuario.hasMany(Encargado, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "encargado",
});

Encargado.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Tramite - seguimiento
Tramite.hasMany(Seguimiento, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "seguimiento",
});

Seguimiento.belongsTo(Tramite, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "tramite",
});

//Usuario - Seguimiento
Usuario.hasMany(Seguimiento, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "seguimiento",
});

Seguimiento.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Etapa - Seguimiento
Etapa.hasMany(Seguimiento, {
  foreignKey: "idEtapa",
  onDelete: "NO ACTION",
  as: "seguimiento",
});

Seguimiento.belongsTo(Etapa, {
  foreignKey: "idEtapa",
  onDelete: "NO ACTION",
  as: "etapa",
});

//usuario - comentario
Usuario.hasMany(Comentario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "comentario",
});

Comentario.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Usuario - Participante
Usuario.hasMany(Participante, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "participante",
});

Participante.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Chat - Participante
Chat.hasMany(Participante, {
  foreignKey: "idChat",
  onDelete: "NO ACTION",
  as: "participante",
});

Participante.belongsTo(Chat, {
  foreignKey: "idChat",
  onDelete: "NO ACTION",
  as: "chat",
});

//Usuario - mensaje
Usuario.hasMany(Mensaje, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "mensaje",
});

Mensaje.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//Chat - Mensaje
Chat.hasMany(Mensaje, {
  foreignKey: "idChat",
  onDelete: "NO ACTION",
  as: "mensaje",
});

Mensaje.belongsTo(Chat, {
  foreignKey: "idChat",
  onDelete: "NO ACTION",
  as: "chat",
});

//Mensaje - Archivo
Mensaje.hasMany(Archivo, {
  foreignKey: "idMensaje",
  onDelete: "NO ACTION",
  as: "archivo",
});

Archivo.belongsTo(Mensaje, {
  foreignKey: "idMensaje",
  onDelete: "NO ACTION",
  as: "mensaje",
});

//Tramite - Pago
Tramite.hasOne(Pago, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "pago",
});

Pago.belongsTo(Tramite, {
  foreignKey: "idTramite",
  onDelete: "NO ACTION",
  as: "tramite",
});

//Usuario - Pago
Usuario.hasMany(Pago, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "pago",
});

Pago.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  onDelete: "NO ACTION",
  as: "usuario",
});

//EstadoPago - Pago
EstadoPago.hasMany(Pago, {
  foreignKey: "idEstadoPago",
  onDelete: "NO ACTION",
  as: "pago",
});

Pago.belongsTo(EstadoPago, {
  foreignKey: "idEstadoPago",
  onDelete: "NO ACTION",
  as: "estadoPago",
});
