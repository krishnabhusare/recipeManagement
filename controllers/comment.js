const Recipe = require('../models/recipe');
const User = require('../models/user');
const Comment = require('../models/comments');


const postComment = async (req, res, next) => {
    try {
        const { comment, recipeid } = req.body;
        const commented = await req.user.createComment({ comment, recipeId: recipeid });

        await req.user.createActivity({
            action: 'reviewed a recipe',
            recipeId: recipeid,
            entityType: "review",
            recipeId: recipeid
        })



        res.status(200).json({ commented, username: req.user.name });

    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getComments = async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const allComment = await Comment.findAll({
            where: { recipeId },
            include: {
                model: User,
                attributes: ['name']
            }

        })
        res.status(200).json({ allComment });


    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    postComment,
    getComments
}