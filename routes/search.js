const express = require('express');
const searchControllers = require('../controllers/search');

const router = express.Router();


router.get('/all-recipe', searchControllers.getAllRecipe);

router.get('/get-recipe', searchControllers.getRecipe);



module.exports = router;