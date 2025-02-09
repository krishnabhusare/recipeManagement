const express = require('express');
const userAuthentication = require('../middelware/auth');
const recipeController = require('../controllers/recipe');

const router = express.Router();

router.post('/add-recipe', userAuthentication.authenticate, recipeController.addRecipe);

router.get('/get-recipe', userAuthentication.authenticate, recipeController.getRecipe);

router.delete('/delete-recipe/:recipeid', userAuthentication.authenticate, recipeController.deleteRecipe);


module.exports = router;