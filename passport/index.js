const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

const dotenv = require('dotenv');
dotenv.config();

module.exports = (app) => {
    app.use(passport.initialize());

    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: 'http://localhost:5000/auth/kakao/callback',
            },

            async (accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await User.findOne({
                        where: { email: profile._json.kakao_account.email },
                    });

                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile._json.kakao_account.email,
                            name: `KAKAO${profile.id}`,
                            nickname: `KAKAO${profile.id}`,
                            password: await bcrypt.hash('a00000000', 10),
                            phone: '01000000000',
                            point: 3000,
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.log(error);
                    done(error);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
