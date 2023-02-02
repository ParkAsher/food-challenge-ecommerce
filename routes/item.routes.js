const express = require('express');
const router = express.Router()

const ItemController = require('../controllers/item.controller')
const itemController = new ItemController()

router.get('/list', itemController.getAllItems);
router.get('/list/:level', itemController.getItemsByLevel);

module.exports = router;
