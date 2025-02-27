const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Follow = sequelize.define('follow', {

    followingId: Sequelize.INTEGER,
    followerId: Sequelize.INTEGER
},
    {
        indexes: [{ unique: true, fields: ["followerId", "followingId"] }]
    })

module.exports = Follow;