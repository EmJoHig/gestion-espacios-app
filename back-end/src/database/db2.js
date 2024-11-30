import { Sequelize } from "sequelize";

const db2 = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,
  {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

export default db2;


