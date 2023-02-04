const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

router.get('/users', adminController.getAllUsers);
router.get('/user/:email', adminController.searchUser);
router.delete('/user', adminController.deleteUser);
router.put('/user', adminController.updateUser);

module.exports = router;
