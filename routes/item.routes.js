const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const ItemController = require('../controllers/item.controller');
const CartController = require('../controllers/basket.controller');

const itemController = new ItemController();
const cartController = new CartController();


router.get('/', itemController.getAllItems);
router.get('/level', itemController.getItemsByLevel);

router.get('/:id', itemController.findOneItem);
router.post('/:id', cartController.addMyCart);

module.exports = router;
