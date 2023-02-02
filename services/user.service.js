const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');
const { User } = require('../models/index');

/* custom error */
const { UserAlreadyExist } = require('../lib/customerror');

class UserService {
    userRepository = new UserRepository(User);

    register = async (userInfo) => {
        try {
            // Email 중복 체크
            const user = await this.userRepository.findUser(userInfo);
            // 해당 Email을 가진 회원이 존재
            if (user) {
                const error = new UserAlreadyExist();
                throw error;
            }

            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(userInfo.password, 10);
            userInfo.password = hashedPassword;

            // 회원가입 진행
            return await this.userRepository.registerUser(userInfo);
        } catch (error) {
            throw error;
        }
    };

    getUserInfoById = async (id) => {
        try {
            const user = await this.userRepository.getUserInfoById(id);

            return user;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserService;
