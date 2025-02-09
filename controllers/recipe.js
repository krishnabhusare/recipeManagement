
const Recipe = require('../models/recipe');

const addRecipe = async (req, res, next) => {
    try {
        const { recipeName, content, procedure } = req.body;
        const recipe = await req.user.createRecipe({ recipeName, content, procedure });
        res.status(201).json({ msg: 'recipe posted', recipe });


    } catch (err) {
        res.status(500).json(err);
    }
}

const getRecipe = async (req, res, next) => {
    try {


        const recipies = await Recipe.findAll({ where: { userId: req.user.id } });

        res.status(200).json({ recipies });


    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteRecipe = async (req, res, next) => {
    try {
        const { recipeid } = req.params;
        await Recipe.destroy({ where: { id: recipeid, userId: req.user.id } });
        res.status(200).json({ msg: 'deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}




module.exports = {
    addRecipe,
    getRecipe,
    deleteRecipe

}