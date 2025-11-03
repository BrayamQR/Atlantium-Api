import axios from "axios";

export const consultaRUC = async (ruc) => {
  try {
    const response = await axios.get(
      `https://api.decolecta.com/v1/sunat/ruc?numero=${ruc}`,
      {
        headers: { Authorization: `Bearer ${process.env.TOKEN_SUNAT}` },
      }
    );
    const data = response.data;

    return {
      ruc: data.numero_documento,
      razonSocial: data.razon_social,
    };
  } catch (error) {
    console.error("❌ Error al consultar RUC:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    throw new Error("Error al obtener información del RUC");
  }
};

export const consultaDNI = async (dni) => {
  try {
    const response = await axios.get(
      `https://api.decolecta.com/v1/reniec/dni?numero=${dni}`,
      {
        headers: { Authorization: `Bearer ${process.env.TOKEN_SUNAT}` },
      }
    );
    const data = response.data;

    return {
      dni: data.document_number,
      nombres: data.first_name,
      apellidoPaterno: data.first_last_name,
      apellidoMaterno: data.second_last_name,
    };
  } catch (error) {
    console.error("❌ Error al consultar RUC:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    throw new Error("Error al obtener información del RUC");
  }
};
