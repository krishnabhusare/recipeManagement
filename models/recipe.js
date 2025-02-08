const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Recipe = sequelize.define('recipe', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    recipeName: Sequelize.STRING,
    content: Sequelize.STRING,
    procedure: Sequelize.STRING

})

module.exports = Recipe;