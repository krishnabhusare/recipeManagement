const express = require('express');
const favoriteControllers = require('../controllers/favorite');
const userAuthentication = require('../middelware/auth');


const router = express.Router();

router.post('/add-favorite', userAuthentication.authenticate, favoriteControllers.addFavorite);

router.get('/get-favoriteRecipe', userAuthentication.authenticate, favoriteControllers.getFavorite);


router.delete('/remove-fromfavorite/:recipeid', userAuthentication.authenticate, favoriteControllers.removeFavorite);

router.post('/create-collection', userAuthentication.authenticate, favoriteControllers.createCollection);

router.get('/get-collection', userAuthentication.authenticate, favoriteControllers.getCollection);

router.post('/add-tocollection', favoriteControllers.addToCollection);

router.get('/get-recipeincollection/:collectionid', favoriteControllers.getRecipeInCollection);

router.delete('/removeRecipeFromCollection/:recipeid/:collectionid', favoriteControllers.removeFromCollection);


module.exports = router;