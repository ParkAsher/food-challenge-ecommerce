const express = require('express');
const router = express.Router();
const itemRouter = require('./item.routes');
const cartRouter = require('./basket.routes');

router.use('/items', itemRouter);
router.use('/cart', cartRouter);

module.exports = router;
