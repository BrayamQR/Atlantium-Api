class VariablesDTO {
  constructor({
    idVariable,
    nomVariable,
    valorVariable,
    tipoVariable,
    descVariable,
    vigenciaVariable,
  }) {
    this.idVariable = idVariable;
    this.nomVariable = nomVariable;
    this.valorVariable = valorVariable;
    this.tipoVariable = tipoVariable;
    this.descVariable = descVariable;
    this.vigenciaVariable = vigenciaVariable;
  }
}

export default VariablesDTO;
