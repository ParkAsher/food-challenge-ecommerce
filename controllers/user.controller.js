const UserService = require('../services/user.service');

/* joi */
const { userRegisterDataValidate } = require('../lib/joischema');

class UserController {
    userService = new UserService();

    register = async (req, res, next) => {
        try {
            const userInfo = await userRegisterDataValidate.validateAsync(req.body);

            const registerResult = await this.userService.register(userInfo);

            return res.status(registerResult.status).json({ message: registerResult.message });
        } catch (error) {
            next(error);
        }
    };

    getUserInfoById = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await this.userService.getUserInfoById(id);

            return res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'error!!' });
        }
    };
}

module.exports = UserController;
