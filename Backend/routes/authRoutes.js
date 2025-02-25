const express = require('express');
const router = express.Router();
const { verifyToken,requireRole } = require('../middleware/verifyToken');
const authController = require('../controllers/authController');

router.post('/register-admin-batch',verifyToken,requireRole("admin"),authController.registerAdminBatch); 
router.post('/register',authController.register); 
router.post('/login', authController.login); 

module.exports = router;
