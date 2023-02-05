const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const itemRouter = require('./item.routes')
const cartRouter = require('./basket.routes');
const orderRouter = require('./order.routes')
const adminRouter = require('./admin.routes');
const orderRouter = require('./order.routes');
const basketRouter = require('./basket.routes');

router.use('/users', userRouter);
router.use('/items', itemRouter)
router.use('/basket', cartRouter);
router.use('/orders', orderRouter)
router.use('/admin', adminRouter);
router.use('/orders', orderRouter);


module.exports = router;