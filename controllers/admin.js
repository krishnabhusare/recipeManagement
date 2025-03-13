
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const User = require('../../../backend/models/user');


const postAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword, isAdmin: true });
        res.status(201).json({ masg: 'admin signup done' })

    } catch (err) {
        res.status(500).json(err);
    }
}

const getAdmin = async (req, res, next) => {
    try {



        const admins = await User.findAll({ where: { id: { [Op.ne]: req.user.id }, isAdmin: true } });

        res.status(200).json(admins);



    } catch (err) {
        res.status(500).json(err);
    }
}


const deleteAdmin = async (req, res, next) => {
    try {
        if (req.user.isAdmin && req.user.isApproved) {
            const { id } = req.params;
            await User.destroy({ where: { id } });
            res.status(200).json({ msg: "deleted" });
        }


    } catch (err) {
        res.status(500).json(err);
    }
}

const approveAdmin = async (req, res, next) => {
    try {

        if (req.user.isAdmin && req.user.isApproved) {
            await User.update({ isApproved: true }, { where: { id: req.params.id } });
            res.status(200).json({ msg: 'updated' });
        }

    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    postAdmin,
    getAdmin,
    deleteAdmin,
    approveAdmin
}