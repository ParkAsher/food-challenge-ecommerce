const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ItemController = require('../controllers/item.controller');
const BasketController = require('../controllers/basket.controller');
const itemController = new ItemController();
const basketController = new BasketController();

router.get('/list', itemController.getAllItems);
router.get('/list/:level', itemController.getItemsByLevel);
router.get('/:id', itemController.findOneItem);
router.post('/:id', auth, basketController.addMyBasket);

module.exports = router;
