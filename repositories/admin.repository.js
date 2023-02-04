class AdminRepository {
    constructor(UserModel) {
        // DI
        this.userModel = UserModel;
    }

    allUsersCount = async () => {
        try {
            return await this.userModel.count();
        } catch (error) {
            throw error;
        }
    };

    getAllUsers = async (page) => {
        try {
            return await this.userModel.findAll({
                offset: (page - 1) * 8,
                limit: 8,
                order: [['id', 'DESC']],
            });
        } catch (error) {
            throw error;
        }
    };

    searchUser = async (email) => {
        try {
            return await this.userModel.findOne({
                where: { email },
            });
        } catch (error) {
            throw error;
        }
    };

    deleteUser = async (userInfo) => {
        try {
            return await this.userModel.destroy({
                where: {
                    id: userInfo.id,
                    email: userInfo.email,
                },
            });
        } catch (error) {
            throw error;
        }
    };
}

module.exports = AdminRepository;
