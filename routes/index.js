const express = require('express');
const router = express.Router();

const userMainRouter = require('./userMain.routes')


router.use('/userMain', userMainRouter)

module.exports = router;
