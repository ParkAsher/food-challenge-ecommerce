const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

/* 
    비밀번호찾기 첫번째 페이지에서 호출되는 API.
    이름, 이메일, 전화번호 를 입력받아 해당하는 회원이 있다면 회원의 id를 가져옴
*/
router.post('/userid', userController.getUserId);

module.exports = router;
