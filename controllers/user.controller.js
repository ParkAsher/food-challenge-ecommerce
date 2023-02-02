const bcrypt = require('bcrypt');
const UserService = require('../services/user.service');

/* joi */
const { userRegisterDataValidate } = require('../lib/joischema');

class UserController {
    userService = new UserService();

    register = async (req, res, next) => {
        try {
            const userInfo = await userRegisterDataValidate.validateAsync(req.body);
        } catch (error) {
            console.log(error.isJoi);
            console.log(error);
            next(error);
        }
    };
}

module.exports = UserController;
