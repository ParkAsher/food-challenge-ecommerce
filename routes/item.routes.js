const express = require('express');
const router = express.Router();
const { ItemController } = require('../controllers/item.controller');
const { CartController } = require('../controllers/basket.controller');
const {} = require("../middleware/auth")
const itemCotroller = new ItemController();
const cartController = new CartController();

router.get('/', itemCotroller.findOneItem);
router.post('/', cartController.addMyCart);

module.exports = router;
