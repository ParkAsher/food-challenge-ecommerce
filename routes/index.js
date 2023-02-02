const express = require('express');
const router = express.Router();

const mainRouter = require('./main.routes')


router.use('/userMain', mainRouter)

module.exports = router;
