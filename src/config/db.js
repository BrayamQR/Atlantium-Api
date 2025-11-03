import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: "mssql",
    dialectOptions: {
      options: {
        port: parseInt(process.env.DB_PORT, 10),
        encrypt: false,
        trustServerCertificate: true,
        useUTC: false,
      },
    },
    timezone: "-05:00",
    logging: false,
  }
);

export default sequelize;
