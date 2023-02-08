const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class SocialLoginController {
    socialLogin = async (req, res) => {
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
    };
}

module.exports = SocialLoginController;
