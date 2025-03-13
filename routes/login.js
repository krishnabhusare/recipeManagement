const express = require('express');

const loginControllers = require('../controllers/login');







const router = express.Router();



router.post('/user-login', loginControllers.userLogin);



module.exports = router;