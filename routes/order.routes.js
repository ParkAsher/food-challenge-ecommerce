const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

router.get('/mypage/:id', orderController.getOrderInfoByUserId);

module.exports = router;
