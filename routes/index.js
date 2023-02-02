const express = require('express');
const router = express.Router();

const userMainRouter = require('./userMain.routes')
const userRouter = require('./user.routes');


router.use('/userMain', userMainRouter)
router.use('/users', userRouter);

module.exports = router;
