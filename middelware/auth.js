const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const dcryptedToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRETE_KEY);
        const user = await User.findByPk(dcryptedToken.userId);
        req.user = user;
        next();

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    authenticate
}