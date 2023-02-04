const express = require('express');
const { NotAdmin, UserNotFound } = require('../lib/customerror');
const { UserAlreadyLogined } = require('../lib/customerror');
const auth = require('../middleware/auth');
const router = express.Router();

/* View Mapping */
router.get('/', auth, (req, res) => {
    const user = !res.locals.user ? null : res.locals.user; // 로그인 안한 상태면 user = null

    res.render('index.ejs', { components: 'main', user: user });
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

router.get('/register', (req, res, next) => {
    res.render('index.ejs', { components: 'register' });
});

router.get('/itemDetail/:id', auth, (req, res) => {
    const user = !res.locals.user ? null : res.locals.user; // 로그인 안한 상태면 user = null

    res.render('index.ejs', { components: 'itemDetail', user: user });
});

router.get('/order', auth, (req, res) => {
    const user = !res.locals.user ? null : res.locals.user; // 로그인 안한 상태면 user = null
    
    res.render('index.ejs', { components: 'order', user: user });
});

/* 관리자 */
router.get('/adm', auth, (req, res, next) => {
    try {
        // 로그인을 하지 않았는 경우
        if (!res.locals.user) {
            const error = new UserNotFound();
            throw error;
        }
        // 로그인을 했지만 관리자가 아닌 경우
        if (res.locals.user.id !== 1) {
            const error = new NotAdmin();
            throw error;
        }

        // 관리자인 경우
        res.render('admin_index.ejs', { components: 'userManagement' });
    } catch (error) {
        next(error);
    }
});

router.get('/adm/user-management', auth, (req, res, next) => {
    try {
        // 로그인을 하지 않았는 경우
        if (!res.locals.user) {
            const error = new UserNotFound();
            throw error;
        }
        // 로그인을 했지만 관리자가 아닌 경우
        if (res.locals.user.id !== 1) {
            const error = new NotAdmin();
            throw error;
        }

        // 관리자인 경우
        res.render('admin_index.ejs', { components: 'userManagement' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
