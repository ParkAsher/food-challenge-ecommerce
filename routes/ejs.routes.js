const express = require('express');
const { UserAlreadyLogined } = require('../lib/customerror');
const auth = require('../middleware/auth');
const router = express.Router();

/* View Mapping */
router.get('/', auth, (req, res, next) => {
    const user = !res.locals.user ? null : res.locals.user; // 로그인 안한 상태면 user = null

    res.render('index.ejs', { components: 'main', user: user });
});

router.get('/register', (req, res, next) => {
    res.render('index.ejs', { components: 'register' });
});

router.get('/itemDetail/:id', (req, res, next) => {
    res.render('index.ejs', { components: 'itemDetail' });
});

router.get('/login', auth, (req, res, next) => {
    try {
        // 이미 로그인 되어있다면?
        if (res.locals.user) {
            const error = new UserAlreadyLogined();
            throw error;
        }

        res.render('index', { components: 'login' });
    } catch (error) {
        next(error);
    }
});

router.get('/mypage', auth, (req, res, next) => {
    const user = !res.locals.user ? null : res.locals.user; // 로그인 안한 상태면 user = null

    res.render('index.ejs', { components: 'mypage', user: user });
});

module.exports = router;
