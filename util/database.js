
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.SHEMA_NAME, process.env.USER_NAME, process.env.SQL_PASSWORD, {
    dialect: "mysql",
    host: process.env.SQL_HOST
})

module.exports = sequelize;