const express = require('express');
const router = express.Router()

const ItemController = require('../controllers/item.controller')
const itemController = new ItemController()


router.get('/', itemController.getAllItems);
router.get('/level', itemController.getItemsByLevel);



module.exports = router;
