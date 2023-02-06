const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const OrderController = require('../controllers/order.controller');
const adminController = new AdminController();
const orderController = new OrderController();

const setUpload = require('../util/upload');

router.get('/users', adminController.getAllUsers);
router.get('/user/:email', adminController.searchUser);
router.delete('/user', adminController.deleteUser);
router.put('/user', adminController.updateUser);
router.get('/order',  orderController.orderList);
router.get('/order/:id',  orderController.findOneOrder);
router.get('/order/search/:email',  orderController.searchOrder);

/* 이미지 업로드 */
router.post('/image', setUpload('food-challenge-ecommerce/item'), adminController.imageUpload);
router.post('/item', adminController.createItem);
router.get('/items', adminController.getAllItems);
router.delete('/item', adminController.deleteItem);
router.put('/item', adminController.updateItem);
router.get('/item', adminController.searchItem);

module.exports = router;
