const User = require('../../../backend/models/user');
const jwt = require('jsonwebtoken');



const authenticate = async (req, res, next) => {
    try {

        const decreptedToken = jwt.verify(req.headers.authorization, process.env.SECRETE_KEY);
        const user = await User.findByPk(decreptedToken.userId);
        req.user = user;
        next();

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { authenticate }