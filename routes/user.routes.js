const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.post('/register', userController.register);
router.get('/mypage/:id', userController.getUserInfoById);

module.exports = router;
