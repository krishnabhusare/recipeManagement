const express = require('express');

const recipeControllers = require('../controllers/recipe');


const router = express.Router();



router.get('/get-recipe', recipeControllers.getRecipe);


router.delete('/delete-recipe/:id', recipeControllers.deleteRecipe);








module.exports = router;