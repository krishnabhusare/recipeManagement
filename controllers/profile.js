const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function tokenGenerator(id, userName) {
    return jwt.sign({ userId: id, userName }, process.env.JWT_SECRETE_KEY);
}

const editProfile = async (req, res, next) => {
    try {
        const { newpassword, displayname } = req.body;
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        await req.user.update({ name: displayname, password: hashedPassword });

        res.status(201).json({ msg: "user profile updated successfully", token: tokenGenerator(req.user.id, displayname) });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    editProfile
}