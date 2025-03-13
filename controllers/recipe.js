
const Recipe = require('../../../backend/models/recipe');


const getRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findAll();
        res.status(200).json(recipe);

    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Recipe.destroy({ where: { id } });
        res.status(200).json({ msg: 'destroyd' });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getRecipe,
    deleteRecipe
}