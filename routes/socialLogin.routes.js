const express = require('express');
const router = express.Router();
const passport = require('passport');

const SocialLoginController = require('../controllers/socialLogin.controller');
const socialLoginController = new SocialLoginController();

router.get('/kakao', passport.authenticate('kakao'));
router.get(
    '/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/',
    }),
    socialLoginController.socialLogin
);

module.exports = router;
