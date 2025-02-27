const express = require('express');
const recipeController = require('../controllers/recipe');
const multer = require('multer');
const AWS = require('aws-sdk');
const userAuthentication = require('../middelware/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/post-recipe', upload.single("image"), userAuthentication.authenticate, recipeController.postRecipe);

router.get('/get-myrecipe', userAuthentication.authenticate, recipeController.getMyRecipe);

router.get('/get-detailedrecipe/:recipeid', recipeController.getDetailsOfRecipe);

router.delete('/delete-recipe/:recipeid', userAuthentication.authenticate, recipeController.deleteRecipe);

router.put('/update-recipe/:recipeid', upload.single("image"), userAuthentication.authenticate, recipeController.updateRecipe)



module.exports = router;