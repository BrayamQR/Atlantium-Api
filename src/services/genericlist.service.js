import * as GenericListRepository from "../repositories/genericlist.repository.js";
import TipoSociedadDTO from "../dtos/tiposociedad.dto.js";
import UbigeoDTO from "../dtos/ubigeo.dto.js";
import EtapaDTO from "../dtos/etapa.dto.js";

export const listTipoSociedad = async () => {
  const lstTipoSociedad = await GenericListRepository.listTipoSociedad();
  return lstTipoSociedad.map((t) => new TipoSociedadDTO(t));
};

export const listUbigeo = async () => {
  const distritos = await GenericListRepository.listUbigeo();

  return distritos.map(
    (d) =>
      new UbigeoDTO.DistritoDTO(
        d.idDistrito,
        d.descDistrito,
        new UbigeoDTO.ProvinciaDTO(
          d.provincia.idProvincia,
          d.provincia.descProvincia,
          new UbigeoDTO.DepartamentoDTO(
            d.provincia.departamento.idDepartamento,
            d.provincia.departamento.descDepartamento
          )
        )
      )
  );
};

export const listEtapa = async () => {
  const lstEtapa = await GenericListRepository.listEtapa();
  return lstEtapa.map((e) => new EtapaDTO(e));
};
