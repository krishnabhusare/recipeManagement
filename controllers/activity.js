const User = require('../models/user');
const Follow = require('../models/follow');
const Recipe = require('../models/recipe');
const Activity = require('../models/activity');



const getNotification = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const followingUsers = await Follow.findAll({
            where: { followerId: userId },
            attributes: ['followingId']
        });

        const followingIds = followingUsers.map(f => f.followingId);

        const activities = await Activity.findAll({
            where: { userId: followingIds },
            order: [['createdAt', 'DESC']],
            include: [{ model: User, attributes: ['name'] }]
        });

        const recipe = await Recipe.findByPk(activities[0].recipeId);


        res.status(200).json({ activities, recipename: recipe.recipename });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getNotification
}