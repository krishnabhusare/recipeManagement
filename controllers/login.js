const jwt = require('jsonwebtoken');
const User = require('../../../backend/models/user');
const bcrypt = require('bcrypt');

function tokenGenerator(id, userName) {
    return jwt.sign({ userId: id, userName }, process.env.SECRETE_KEY);
}

const userLogin = async (req, res, next) => {
    try {


        const { email, password } = req.body;

        const user = await User.findAll({ where: { email } });



        if (user[0].isAdmin && user[0].isApproved) {
            if (await bcrypt.compare(password, user[0].password)) {
                return res.status(201).json({ msg: "login successfull", token: tokenGenerator(user[0].id, user[0].name) });
            } else {
                return res.status(403).json({ msg: "password wrong" });
            }
        } else {
            res.status(401).json({ msg: "user not found" })
        }

    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    userLogin
}