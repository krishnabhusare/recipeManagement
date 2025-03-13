const User = require('../../../backend/models/user');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({ where: { isAdmin: false } });
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getUsers
}