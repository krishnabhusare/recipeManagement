const { Op } = require('sequelize');
const Recipe = require('../models/recipe');


const getAllRecipe = async (req, res, next) => {
    try {
        const allReciep = await Recipe.findAll();
        res.status(200).json({ allReciep });

    } catch (err) {
        res.status(500).json(err);
    }
}

const getRecipe = async (req, res, next) => {
    try {

        const { query, cuisin, mainingredient, cookingtime, serves } = req.query;
        const recipe = {};

        if (query) {
            recipe.recipename = { [Op.like]: `%${query}%` };
        }
        if (cuisin) {
            recipe.cuisin = cuisin;
        }
        if (mainingredient) {
            recipe.mainingredient = mainingredient;
        }
        if (cookingtime) {
            recipe.cookingtime = cookingtime;

        }
        if (serves) {
            recipe.serves = serves;
        }

        console.log(recipe);
        const searchedRecipe = await Recipe.findAll({
            where: recipe
        })


        res.status(200).json({ searchedRecipe });



    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = {
    getAllRecipe,
    getRecipe
}