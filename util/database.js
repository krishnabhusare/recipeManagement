
const Sequelize = require('sequelize');



const sequelize = new Sequelize(process.env.SQL_SCHEMA_NAME, process.env.SQL_USER_NAME, process.env.SQL_PASSWORD, {
    dialect: "mysql",
    host: process.env.SQL_HOST
})

module.exports = sequelize;