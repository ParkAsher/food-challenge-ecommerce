const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.post('/userid', userController.getUserId);
router.patch('/password', userController.updatePassword);

router.post('/email', userController.getUserEmail);

router.get('/mypage/:id', userController.getUserInfoById);

module.exports = router;
