const express = require('express');
const userAuthentication = require('../middelware/auth');
const adminControllers = require('../controllers/admin');

const router = express.Router();

router.delete('/delete-user/:userid', userAuthentication.authenticate, adminControllers.deleteUser);



module.exports = router;