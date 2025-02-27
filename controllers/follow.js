const { Op } = require('sequelize');
const User = require('../models/user');
const Follow = require('../models/follow');


const getUserToFollow = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: { id: { [Op.ne]: req.user.id } }

        });
        res.status(200).json({ users });


    } catch (err) {
        res.status(500).json(err);
    }
}

const followUsers = async (req, res, next) => {
    try {
        const { userid } = req.body;

        await Follow.create({ followerId: req.user.id, followingId: userid });
        res.status(201).json({ msg: "follwed" })

    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getFollowing = async (req, res, next) => {
    try {
        const following = await Follow.findAll({
            where: { followerId: req.user.id }

        })
        var arr = [];
        for (let i = 0; i < following.length; i++) {

            const user = await User.findByPk(following[i].followingId);
            arr.push({ id: user.id, name: user.name });

        }



        res.status(200).json({ arr });

    } catch (err) {
        res.status(500).json(err);
    }
}

const unfollow = async (req, res, next) => {
    try {
        const { userid } = req.params;
        await Follow.destroy({
            where: { followingId: userid, followerId: req.user.id }
        })
        res.status(200).json({ msg: 'unfollowed' })

    } catch (err) {
        res.status(500).json(err);
    }
}

const getFollowers = async (req, res, next) => {
    try {
        const followers = await Follow.findAll({
            where: { followingId: req.user.id }
        })
        const arr = [];
        for (let i = 0; i < followers.length; i++) {
            const users = await User.findByPk(followers[i].followerId);
            arr.push({ id: users.id, name: users.name });
        }
        res.status(200).json({ arr });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getUserToFollow,
    followUsers,
    getFollowing,
    unfollow,
    getFollowers
}