const express = require('express');
const { UserAlreadyLogined } = require('../lib/customerror');
const auth = require('../middleware/auth');
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

router.get('/login', auth, (req, res, next) => {
    try {
        // 이미 로그인 되어있다면?
        if (res.locals.user) {
            const error = new UserAlreadyLogined();
            throw error;
        }

        res.render('index', { components: 'login', user: res.locals.user });
    } catch (error) {
        throw error;
    }
});

module.exports = router;
