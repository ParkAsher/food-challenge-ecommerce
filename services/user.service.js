const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

/* env */
dotenv.config();

/* custom error */
const { UserAlreadyExist, UserNotFound, IncorrectPassword } = require('../lib/customerror');

class UserService {
    userRepository = new UserRepository(User);

    register = async (userInfo) => {
        try {
            // 닉네임이나 Email을 가진 회원이 존재하는지 체크
            const user = await this.userRepository.findUser(userInfo, 'register');
            // 존재한다면?
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

    login = async (userInfo) => {
        try {
            // 해당 Email을 가진 회원이 존재하는지 체크
            const user = await this.userRepository.findUser(userInfo, 'login');
            // 존재하지 않는다면?
            if (!user) {
                const error = new UserNotFound();
                throw error;
            }

            // 비밀번호 비교
            const comparePassword = await bcrypt.compare(userInfo.password, user.password);

            if (!comparePassword) {
                const error = new IncorrectPassword();
                throw error;
            }

            // access token
            const accessToken = jwt.sign(
                {
                    id: user.id,
                    nickname: user.nickname,
                },
                process.env.COOKIE_SECRET,
                {
                    expiresIn: '1d',
                }
            );

            return { status: 200, accessToken };
        } catch (error) {
            throw error;
        }
    };

    getUserId = async (userInfo) => {
        try {
            // 해당 Name, Email, Phone을 가진 유저가 존재하는지
            const userId = await this.userRepository.getUserId(userInfo);
            // 존재하지 않는다면?
            if (!userId) {
                const error = new UserNotFound();
                throw error;
            }

            return { status: 200, id: userId.id };
        } catch (error) {
            throw error;
        }
    };

    updatePassword = async (userInfo) => {
        try {
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(userInfo.password, 10);
            userInfo.password = hashedPassword;

            return await this.userRepository.updatePassword(userInfo);
        } catch (error) {
            throw error;
        }
    };

    getUserInfoById = async (id) => {
        try {
            const user = await this.userRepository.getUserInfoById(id);

            const userInfo = {
                name: user.name,
                nickname: user.nickname,
                email: user.email,
                point: user.point,
            };

            return userInfo;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserService;
