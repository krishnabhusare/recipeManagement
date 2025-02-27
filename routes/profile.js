const express = require('express');
const profileController = require('../controllers/profile');
const userAuthentication = require('../middelware/auth');

const router = express.Router();

router.post('/edit-profile', userAuthentication.authenticate, profileController.editProfile);


module.exports = router;