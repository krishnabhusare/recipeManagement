const express = require('express');
const allRecipeControllers = require('../controllers/allRecipe');
const userAuthentication = require('../middelware/auth');

const router = express.Router();


router.get('/get-allRecipe', allRecipeControllers.getAllRecipe);

router.post('/add-comment', userAuthentication.authenticate, allRecipeControllers.postComment);

router.get('/get-allcomments/:recipeid', userAuthentication.authenticate, allRecipeControllers.getAllComments);





module.exports = router;