const express = require('express');
const { verifyToken,verifyUser,requireRole } = require('../middleware/verifyToken');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile/:id',verifyToken,verifyUser, userController.getProfile); 

module.exports = router;
