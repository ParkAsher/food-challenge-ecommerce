const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/item.controller');
const CartController = require('../controllers/basket.controller');
const itemController = new ItemController();
const cartController = new CartController();

router.get('/list', itemController.getAllItems);
router.get('/list/:level', itemController.getItemsByLevel);
router.get('/:id', itemController.findOneItem);
router.post('/:id', cartController.addMyCart);

module.exports = router;
