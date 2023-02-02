const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;
