const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

const setUpload = require('../util/upload');

router.get('/users', adminController.getAllUsers);
router.get('/user/:email', adminController.searchUser);
router.delete('/user', adminController.deleteUser);
router.put('/user', adminController.updateUser);

/* 이미지 업로드 */
router.post('/image', setUpload('food-challenge-ecommerce/item'), adminController.imageUpload);

module.exports = router;
