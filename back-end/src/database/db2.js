import { Sequelize } from 'sequelize'

const db2 = new Sequelize('gestion_espacios', 'root', 'rootbelt',
    {host: "localhost", port: 3306,
    dialect: 'mysql',
    logging: false,
})

export default db2