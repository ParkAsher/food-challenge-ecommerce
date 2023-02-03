const express = require('express');
const { NotAdmin } = require('../lib/customerror');
const router = express.Router();
const auth = require('../middleware/auth');

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

/* 관리자 */
// router.get('/adm', auth, (req, res, next) => {
//     try {
//         if (res.locals.user.id === '1' && res.locals.user.nickname === '관리자') {
//             res.render('admin_index');
//         } else {
//             const error = new NotAdmin();
//             throw error;
//         }
//     } catch (error) {
//         throw error;
//     }
// });
/* 테스트 */
router.get('/adm', (req, res, next) => {
    try {
        res.render('admin_index');
    } catch (error) {
        throw error;
    }
});

module.exports = router;
