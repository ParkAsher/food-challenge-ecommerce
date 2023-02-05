const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const OrderController = require('../controllers/order.controller');
const adminController = new AdminController();
const orderController = new OrderController();

router.get('/users', adminController.getAllUsers);
router.get('/user/:email', adminController.searchUser);
router.delete('/user', adminController.deleteUser);
router.put('/user', adminController.updateUser);
router.get('/order',  orderController.orderList);

module.exports = router;
