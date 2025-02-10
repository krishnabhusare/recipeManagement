const Comments = require('../models/comments');
const Recipe = require('../models/recipe');

const getAllRecipe = async (req, res, next) => {
    try {
        const allRecipe = await Recipe.findAll();
        res.status(200).json({ allRecipe });

    } catch (err) {
        res.status(500).json(err);
    }
}

const postComment = async (req, res, next) => {
    try {
        const { comment, recipeid } = req.body;

        const comments = await req.user.createComment({ comment, recipeId: recipeid })
        res.status(201).json({ comments, username: req.user.name });

    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getAllComments = async (req, res, next) => {
    try {
        const { recipeid } = req.params;
        const allcomments = await Comments.findAll({
            where: { recipeId: recipeid },
            include: {
                model: User,
                attributes: ['name']
            }
        }



        )
        res.status(200).json({ allcomments });

    }
    catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    getAllRecipe,
    postComment,
    getAllComments
}
