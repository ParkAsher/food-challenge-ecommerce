const express = require('express');
const router = express.Router()

const MainController = require('../controllers/userMain.controller')
const mainController = new MainController()

router.get('/item_list', mainController.getAllItems);
router.get('/item_list/:level', mainController.getItemsByLevel);

module.exports = router;
