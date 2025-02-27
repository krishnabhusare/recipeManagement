const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Collection = sequelize.define('collection', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
})

module.exports = Collection;