const User = require('../../../backend/models/user');

const deleteUser = async (req, res, next) => {
    try {

        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.status(200).json({ msg: " user deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    deleteUser
}