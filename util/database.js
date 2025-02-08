const Sequelize = require('sequelize');

const sequelize = new Sequelize('recipe', 'root', 'Krish@123', {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;