const User = require('../models/user');

const deleteUser = async (req, res, next) => {
    try {
        const { userid } = req.params;
        if (req.user.isAdmin) {
            await User.destroy({ where: { id: userid } });
        }
        res.status(200).json({ msg: "deleted" });


    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    deleteUser
}