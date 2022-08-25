import sequelize from "sequelize";
import dotenv from "dotenv/config"

const db = new sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false //no agrega columnas al registro alpedo
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
}); //primero va la base de datos a la que nos queremos conectar, segundo usuario, luego pass y luego en la llave configuraciones

export default db;