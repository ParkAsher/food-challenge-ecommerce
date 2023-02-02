const UserService = require('../services/user.service');

/* joi */
const {
    userRegisterDataValidate,
    userLoginDataValidate,
    userFindPasswordDataValidate,
} = require('../lib/joischema');

class UserController {
    userService = new UserService();

    register = async (req, res, next) => {
        try {
            const userInfo = await userRegisterDataValidate.validateAsync(req.body);

            const { status, message } = await this.userService.register(userInfo);

            return res.status(status).json({ message });
        } catch (error) {
            next(error);
        }
    };

    login = async (req, res, next) => {
        try {
            const userInfo = await userLoginDataValidate.validateAsync(req.body);

            const { status, accessToken } = await this.userService.login(userInfo);

            res.cookie('accessToken', accessToken);
            return res.status(status).json({ accessToken });
        } catch (error) {
            next(error);
        }
    };

    logout = async (req, res, next) => {
        try {
            res.clearCookie('accessToken');

            return res.status(200).json({ message: '정상적으로 로그아웃 되었습니다.' });
        } catch (error) {
            next(error);
        }
    };

    getUserId = async (req, res, next) => {
        try {
            const userInfo = await userFindPasswordDataValidate.validateAsync(req.body);

            const { status, id } = await this.userService.getUserId(userInfo);

            return res.status(status).json({ id });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = UserController;
