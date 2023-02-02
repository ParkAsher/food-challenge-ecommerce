const express = require('express');
const router = express.Router();

/* View Mapping */
router.get('/', (req, res, next) => {
    res.render('index.ejs', { components: 'main' });
});

router.get('/register', (req, res, next) => {
    res.render('index.ejs', { components: 'register' });
});

router.get('/userMain', (req, res, next) => {
    res.render('index.ejs', { components: 'userMain' });
});

router.get('/items', (req, res, next) => {
    res.render('index.ejs', { components: 'oneItem' });
});

module.exports = router;
