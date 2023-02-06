const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');
const { UserNotFound } = require('../lib/customerror');

/* env */
dotenv.config();

module.exports = async (req, res, next) => {
    try {
        // accessToken 들고오기
        const { accessToken } = req.cookies;

        // accessToken 없음
        if (!accessToken) {
            return next();
        }

        const { id, nickname } = jwt.verify(accessToken, process.env.COOKIE_SECRET);

        const user = await User.findOne({
            where: {
                id,
                nickname,
            },
        });

        // 해당하는 회원이 존재하지 않을 때
        if (!user) {
            const error = new UserNotFound();
            throw error;
        }

        res.locals.user = user;
        next();
    } catch (error) {
        res.clearCookie('accessToken');
        next(error);
    }
};
