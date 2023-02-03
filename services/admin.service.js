const { User } = require('../models/index');
const UserRepository = require('../repositories/user.repository');

class AdminService {
    userRepository = new UserRepository(User);
}

module.exports = AdminService;
