class DepartamentoDTO {
  constructor(idDepartamento, descDepartamento) {
    this.idDepartamento = idDepartamento;
    this.descDepartamento = descDepartamento;
  }
}

class ProvinciaDTO {
  constructor(idProvincia, descProvincia, departamento = null) {
    this.idProvincia = idProvincia;
    this.descProvincia = descProvincia;
    this.departamento = departamento
      ? new DepartamentoDTO(
          departamento.idDepartamento,
          departamento.descDepartamento
        )
      : null;
  }
}

class DistritoDTO {
  constructor(idDistrito, descDistrito, provincia = null) {
    this.idDistrito = idDistrito;
    this.descDistrito = descDistrito;
    this.provincia = provincia
      ? new ProvinciaDTO(
          provincia.idProvincia,
          provincia.descProvincia,
          provincia.departamento
        )
      : null;
  }
}

export default { DepartamentoDTO, ProvinciaDTO, DistritoDTO };
