const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.get('/kakao', passport.authenticate('kakao'));
router.get(
    '/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/',
    }),
    (req, res) => {
        console.log(req.user);
        const accessToken = jwt.sign(
            {
                id: req.user.id,
                nickname: req.user.nickname,
            },
            process.env.COOKIE_SECRET,
            {
                expiresIn: '1d',
            }
        );
        res.cookie('accessToken', accessToken);
        res.redirect('/');
    }
);

module.exports = router;
