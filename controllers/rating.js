const Recipe = require('../models/recipe');
const User = require('../models/user');
const Rating = require('../models/rating');


const postRating = async (req, res, next) => {
    try {
        const { selectedRating, recipeid } = req.body;
        const rating = await req.user.createRating({ rating: selectedRating, recipeId: recipeid });
        res.status(201).json({ msg: "rating given" })

    } catch (err) {
        res.status(500).json(err);
    }
}

const getRating = async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const rating = await Rating.findAll({
            where: { recipeId, userId: req.user.id }
        })
        res.status(200).json({ rating });

    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    postRating,
    getRating
}