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
}

module.exports = UserController;
