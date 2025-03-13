const express = require('express');
const userAuthentication = require('../middelware/auth');

const adminControllers = require('../controllers/admin');


const router = express.Router();




router.post('/add-admin', adminControllers.postAdmin);

router.get('/get-admin', userAuthentication.authenticate, adminControllers.getAdmin);

router.delete('/delete-admin/:id', userAuthentication.authenticate, adminControllers.deleteAdmin);

router.get('/approve-admin/:id', userAuthentication.authenticate, adminControllers.approveAdmin);



module.exports = router;