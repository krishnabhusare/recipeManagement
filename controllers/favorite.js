const Recipe = require('../models/recipe');
const User = require('../models/user');
const Collection = require('../models/collection');


const addFavorite = async (req, res, next) => {
    try {
        const { recipeid } = req.body;
        const user = await User.findByPk(req.user.id);
        const recipe = await Recipe.findByPk(recipeid);



        const added = await recipe.addUser(user);

        res.status(201).json({ msg: 'added' });

    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getFavorite = async (req, res, next) => {
    try {
        const userid = req.user.id;
        const user = await User.findByPk(userid, {
            include: {
                model: Recipe,
                through: { attributes: [] },
            }
        })

        res.status(200).json({ user });

    }
    catch (err) {
        res.status(500).json(err);
    }
}


const removeFavorite = async (req, res, next) => {
    try {
        console.log(req.params, req.user.id)
        const { recipeid } = req.params;
        const user = await User.findByPk(req.user.id);
        const recipe = await Recipe.findByPk(recipeid);
        await recipe.removeUser(user);
        res.status(200).json({ msg: 'removed from favorite' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const createCollection = async (req, res, next) => {
    try {
        const { name } = req.body;
        const collection = await req.user.createCollection({ name });
        res.status(201).json({ collection });

    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getCollection = async (req, res, next) => {
    try {
        const collection = await Collection.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ collection });

    } catch (err) {
        res.status(500).json(err);
    }
}

const addToCollection = async (req, res, next) => {
    try {
        const { collectionid, recipeid } = req.body;
        const recipe = await Recipe.findByPk(recipeid);
        const collection = await Collection.findByPk(collectionid);
        await recipe.addCollection(collection);

        res.status(201).json({ msg: 'added to collection' });

    } catch (err) {
        res.status(500).json(err);
    }
}

const getRecipeInCollection = async (req, res, next) => {
    try {
        const { collectionid } = req.params;
        const recipecollection = await Collection.findByPk(collectionid,
            {
                include: Recipe,
                through: { attributes: [] }
            }
        )
        res.status(200).json({ recipecollection });
    } catch (err) {
        res.status(500).json(err);
    }
}

const removeFromCollection = async (req, res, next) => {
    try {
        const { recipeid, collectionid } = req.params;
        const recipe = await Recipe.findByPk(recipeid);
        const collection = await Collection.findByPk(collectionid);
        await collection.removeRecipe(recipe);
        res.status(200).json({ msg: 'recipe removed from collection' });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    addFavorite,
    getFavorite,
    removeFavorite,
    createCollection,
    getCollection,
    addToCollection,
    getRecipeInCollection,
    removeFromCollection

}