const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Activity = sequelize.define('activity', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    action: Sequelize.STRING,
    recipeId: Sequelize.INTEGER,
    entityType: Sequelize.STRING
})

module.exports = Activity;