const express = require('express');
const userAuthentication = require('../middelware/auth');
const activityControllers = require('../controllers/activity');

const router = express.Router();

router.get('/get-notification', userAuthentication.authenticate, activityControllers.getNotification);



module.exports = router;