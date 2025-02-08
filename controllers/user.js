const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


function tokenGenerator(userid) {
    return jwt.sign({ id: userid }, "secreteKey");
}

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password, password: hashedPassword });
        res.status(201).json({ msg: "user created " })

    } catch (err) {
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
                return res.status(201).json({ user, token: tokenGenerator(user[0].id) })
            }
            else {
                return res.status(404).json({ msg: "password incorrect" });
            }
        }
        else {
            res.status(400).json({ msg: "user not found" });
        }

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = {
    signup,
    login
}