class UserRepository {
    constructor(UserModel) {
        // DI
        this.userModel = UserModel;
    }

    findUser = async (userInfo) => {
        try {
            const user = await this.userModel.findOne({
                where: { email: userInfo.email },
            });

            return user;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserRepository;
