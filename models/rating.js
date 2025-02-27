const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Rating = sequelize.define('rating', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    rating: Sequelize.INTEGER,

}, {
    indexes: [
        {
            unique: true,
            fields: ["userId", "recipeId"]
        }
    ]
})


module.exports = Rating;