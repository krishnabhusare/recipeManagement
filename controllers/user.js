const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function tokenGenerator(id, userName) {
    return jwt.sign({ userId: id, userName }, process.env.JWT_SECRETE_KEY);
}



const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ msg: 'user registered successfully' });

    }
    catch (err) {
        res.status(500).json(err);
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const user = await User.findAll({ where: { email } });
        if (user.length == 1) {
            const result = await bcrypt.compare(password, user[0].password);
            if (result) {
                return res.status(201).json({ msg: 'user sign in successfully', user, token: tokenGenerator(user[0].id, user[0].name) });
            } else {
                return res.status(404).json({ msg: 'password is wrong' });
            }
        } else {
            return res.status(401).json({ msg: 'user not found' });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    signup,
    login
}