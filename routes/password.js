const express = require('express');
const passwordControllers = require('../controllers/password');

const router = express.Router();


router.post('/forgot-password', passwordControllers.forgotPassword);

router.get('/reset-password/:passwordid', passwordControllers.resetPassword);

router.get('/update-password/:passwordid', passwordControllers.updatePassword);

module.exports = router;