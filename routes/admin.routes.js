const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

router.get('/users', adminController.getAllUsers);

module.exports = router;
