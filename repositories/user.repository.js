const { Op } = require('sequelize');

class UserRepository {
    constructor(UserModel) {
        // DI
        this.userModel = UserModel;
    }

    findUser = async (userInfo) => {
        try {
            const user = await this.userModel.findOne({
                where: {
                    [Op.or]: [{ email: userInfo.email }, { nickname: userInfo.nickname }],
                },
            });

            return user;
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

    getUserInfoById = async (id) => {
        try {
            const userInfo = await this.userModel.findOne({ id });

            console.log('this is my ---- +++++ ' + userInfo);

            return userInfo;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

module.exports = UserRepository;
