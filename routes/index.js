const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const itemRouter = require('./item.routes');
const cartRouter = require('./basket.routes');
<<<<<<< HEAD
const orderRouter = require('./order.routes');
=======
const adminRouter = require('./admin.routes');
>>>>>>> origin/dev

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/basket', cartRouter);
<<<<<<< HEAD
router.use('/orders', orderRouter);
=======
router.use('/admin', adminRouter);
>>>>>>> origin/dev

module.exports = router;
