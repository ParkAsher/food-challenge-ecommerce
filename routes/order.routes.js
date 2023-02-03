const express = require('express');
const router = express.Router()

const OrderController = require('../controllers/order.controller')
const orderController = new OrderController()

router.get('/', orderController.saveOrder);


module.exports = router;


