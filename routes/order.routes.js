const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();
const auth = require('../middleware/auth');

router.post('/', auth, orderController.saveOrder);
router.get('/basketList', auth, orderController.getBasketList);
router.get('/mypage/:id', orderController.getOrderInfoByUserId);

module.exports = router;
