const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Comments = sequelize.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    comment: Sequelize.STRING
})

module.exports = Comments;