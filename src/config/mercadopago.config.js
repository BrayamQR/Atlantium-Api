import { MercadoPagoConfig, Preference } from "mercadopago";

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error("MP_ACCESS_TOKEN no definido en las variables de entorno");
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// Crear instancia de Preference con el cliente
export const preferenceClient = new Preference(client);

export default client;
