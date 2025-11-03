import UbigeoDTO from "../dtos/ubigeo.dto.js";
import ArchivoDTO from "../dtos/archivo.dto.js";
import TipoSociedadDTO from "../dtos/tiposociedad.dto.js";

class PersonaJuridicaDTO {
  constructor({
    idPersonaJuridica,
    rucPersonaJuridica,
    razonSocial,
    nomComercio,
    tipoSociedad,
    telContacto,
    dirLegal,
    distrito,
    webEmpresarial,
    vigenciaPersonaJuridica,
    idUsuario,
    representanteLegal,
  }) {
    this.idPersonaJuridica = idPersonaJuridica;
    this.rucPersonaJuridica = rucPersonaJuridica;
    this.razonSocial = razonSocial;
    this.nomComercio = nomComercio;
    this.tipoSociedad = tipoSociedad ? new TipoSociedadDTO(tipoSociedad) : null;
    this.telContacto = telContacto;
    this.dirLegal = dirLegal;
    this.distrito = distrito
      ? new UbigeoDTO.DistritoDTO(
          distrito.idDistrito,
          distrito.descDistrito,
          distrito.provincia
            ? new UbigeoDTO.ProvinciaDTO(
                distrito.provincia.idProvincia,
                distrito.provincia.descProvincia,
                distrito.provincia.departamento
                  ? new UbigeoDTO.DepartamentoDTO(
                      distrito.provincia.departamento.idDepartamento,
                      distrito.provincia.departamento.descDepartamento
                    )
                  : null
              )
            : null
        )
      : null;
    this.webEmpresarial = webEmpresarial;
    this.vigenciaPersonaJuridica = vigenciaPersonaJuridica;
    this.idUsuario = idUsuario;
    this.representanteLegal = representanteLegal
      ? new RepresentanteLegalDTO(representanteLegal[0])
      : null;
  }
}

class PersonaNaturalDTO {
  constructor({
    idPersonaNatural,
    docIdentidad,
    rucPersonaNatural,
    nomPersona,
    apePersona,
    fechaNacimiento,
    telPersona,
    celPersona,
    dirPersona,
    distrito,
    cipProfesional,
    espeProfesional,
    vigenciaPerNatural,
    idUsuario,
    archivo,
  }) {
    this.idPersonaNatural = idPersonaNatural;
    this.docIdentidad = docIdentidad;
    this.rucPersonaNatural = rucPersonaNatural;
    this.nomPersona = nomPersona;
    this.apePersona = apePersona;
    this.fechaNacimiento = fechaNacimiento;
    this.telPersona = telPersona;
    this.celPersona = celPersona;
    this.dirPersona = dirPersona;
    this.distrito = distrito
      ? new UbigeoDTO.DistritoDTO(
          distrito.idDistrito,
          distrito.descDistrito,
          distrito.provincia
            ? new UbigeoDTO.ProvinciaDTO(
                distrito.provincia.idProvincia,
                distrito.provincia.descProvincia,
                distrito.provincia.departamento
                  ? new UbigeoDTO.DepartamentoDTO(
                      distrito.provincia.departamento.idDepartamento,
                      distrito.provincia.departamento.descDepartamento
                    )
                  : null
              )
            : null
        )
      : null;
    this.cipProfesional = cipProfesional;
    this.espeProfesional = espeProfesional;
    this.vigenciaPerNatural = vigenciaPerNatural;
    this.idUsuario = idUsuario;
    this.archivo =
      archivo && archivo.length > 0 ? new ArchivoDTO(archivo[0]) : null;
  }
}

class RepresentanteLegalDTO {
  constructor({
    idRepresentante,
    docIdentidad,
    nomRepresentante,
    apeRepresentante,
    celContacto,
    emailRepresentante,
    cargoRepresentante,
    idPersonaJuridica,
    vigenciaRepresentanteLegal,
  }) {
    this.idRepresentante = idRepresentante;
    this.docIdentidad = docIdentidad;
    this.nomRepresentante = nomRepresentante;
    this.apeRepresentante = apeRepresentante;
    this.celContacto = celContacto;
    this.emailRepresentante = emailRepresentante;
    this.cargoRepresentante = cargoRepresentante;
    this.idPersonaJuridica = idPersonaJuridica;
    this.vigenciaRepresentanteLegal = vigenciaRepresentanteLegal;
  }
}

export default {
  PersonaJuridicaDTO,
  PersonaNaturalDTO,
  RepresentanteLegalDTO,
};
