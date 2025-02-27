const express = require('express');
const userAuthentication = require('../middelware/auth');
const commentControllers = require('../controllers/comment');


const router = express.Router();


router.post('/post-comment', userAuthentication.authenticate, commentControllers.postComment);

router.get('/get-allComment/:recipeId', commentControllers.getComments);



module.exports = router;