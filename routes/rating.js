const express = require('express');
const userAuthentication = require('../middelware/auth');
const ratingControllers = require('../controllers/rating');

const router = express.Router();

router.post('/give-rating', userAuthentication.authenticate, ratingControllers.postRating);

router.get('/get-rating/:recipeId', userAuthentication.authenticate, ratingControllers.getRating);


module.exports = router;