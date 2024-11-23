import { Sequelize } from "sequelize";

const db2 = new Sequelize("gestionespaciosdb", "root", "Titansport73.", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

export default db2;
