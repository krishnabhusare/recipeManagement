const express = require('express');

const deleteControllers = require('../controllers/delete');

const router = express.Router();

router.delete('/delete-user/:id', deleteControllers.deleteUser);


module.exports = router;