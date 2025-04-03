const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/users', authController.getAllUsers);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;