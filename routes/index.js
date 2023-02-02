const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const itemRouter = require('./item.routes');

router.use('/users', userRouter);
router.use('/items', itemRouter);

module.exports = router;
