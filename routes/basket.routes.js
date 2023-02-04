const express = require('express');
const auth = require('../middleware/auth');
const CartController = require('../controllers/basket.controller');
const router = express.Router();

const cartController = new CartController();

router.get('/', auth, cartController.getInfoInMyCart);
router.delete('/', auth, cartController.deleteItemInCart);

module.exports = router;
