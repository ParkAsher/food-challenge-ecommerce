const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const userMainRouter = require('./userMain.routes')


router.use('/userMain', userMainRouter)
=======
const userRouter = require('./user.routes');
router.use('/users', userRouter);
>>>>>>> dev

module.exports = router;
