const express = require('express');
const userAuthentication = require('../middelware/auth');
const followControllers = require('../controllers/follow');

const router = express.Router();

router.get('/get-usersToFollow', userAuthentication.authenticate, followControllers.getUserToFollow);

router.post('/followUsers', userAuthentication.authenticate, followControllers.followUsers);

router.get('/get-following', userAuthentication.authenticate, followControllers.getFollowing);

router.delete('/unfollow/:userid', userAuthentication.authenticate, followControllers.unfollow);

router.get('/get-followers', userAuthentication.authenticate, followControllers.getFollowers);




module.exports = router;