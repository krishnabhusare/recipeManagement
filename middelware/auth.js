const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        const decreptedToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRETE_KEY);
        const user = await User.findByPk(decreptedToken.id);

        req.user = user;
        next();



    }
    catch (err) {
        res.status(500).json({ msg: "failed while authenticate" })
    }
}

module.exports = {
    authenticate
}