const { Op } = require('sequelize');

class UserRepository {
    constructor(UserModel) {
        // DI
        this.userModel = UserModel;
    }

    findUser = async (userInfo, type) => {
        try {
            if (type === 'register') {
                return await this.userModel.findOne({
                    where: {
                        [Op.or]: [{ email: userInfo.email }, { nickname: userInfo.nickname }],
                    },
                });
            }

            if (type === 'login') {
                return await this.userModel.findOne({
                    where: { email: userInfo.email },
                });
            }
        } catch (error) {
            throw error;
        }
    };

    registerUser = async (userInfo) => {
        try {
            await this.userModel.create({
                name: userInfo.name,
                nickname: userInfo.nickname,
                email: userInfo.email,
                password: userInfo.password,
                phone: userInfo.phone,
            });
            return { status: 200, message: '회원가입에 성공했습니다.' };
        } catch (error) {
            throw error;
        }
    };

    getUserId = async (userInfo) => {
        try {
            const userId = await this.userModel.findOne({
                attributes: ['id'],
                where: {
                    name: userInfo.name,
                    email: userInfo.email,
                    phone: userInfo.phone,
                },
            });

            return userId;
        } catch (error) {
            throw error;
        }
    };

    updatePassword = async (userInfo) => {
        try {
            await this.userModel.update(
                {
                    password: userInfo.password,
                },
                {
                    where: {
                        id: userInfo.id,
                    },
                }
            );

            return { status: 200, message: '비밀번호를 수정했습니다.' };
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserRepository;
