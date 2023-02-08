const express = require('express');
const auth = require('../middleware/auth');
const BasketController = require('../controllers/basket.controller');
const router = express.Router();

const basketController = new BasketController();

router.get('/', auth, basketController.getInfoInMyBasket);
router.delete('/', auth, basketController.deleteItemInBasket);

module.exports = router;
