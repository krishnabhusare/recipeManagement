const express = require('express');

const userControllers = require('../controllers/users');

const router = express.Router();


router.get('/get-user', userControllers.getUsers);


module.exports = router;