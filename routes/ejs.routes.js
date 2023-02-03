const express = require('express');
const router = express.Router();

/* View Mapping */
router.get('/', (req, res, next) => {
    res.render('index.ejs', { components: 'main' });
});

router.get('/register', (req, res, next) => {
    res.render('index.ejs', { components: 'register' });
});

router.get('/itemDetail/:id', (req, res, next) => {
    res.render('index.ejs', { components: 'itemDetail' });
});

// router.get('/itemDetail/*', (req, res, next) => {
//     res.render('index.ejs', { components: 'itemDetail' });
// });

router.get('/mypage/:id', (req, res, next) => {
    res.render('index.ejs', { components: 'mypage' });
});

module.exports = router;
