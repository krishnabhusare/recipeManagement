const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Recipe = sequelize.define('recipe', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    recipename: Sequelize.STRING,
    description: Sequelize.TEXT,
    ingredient: Sequelize.STRING,
    method: Sequelize.TEXT,
    cuisin: Sequelize.STRING,
    mainingredient: Sequelize.STRING,
    cookingtime: Sequelize.STRING,
    serves: Sequelize.INTEGER,
    keyword: Sequelize.STRING,
    imageurl: Sequelize.STRING

})

module.exports = Recipe;