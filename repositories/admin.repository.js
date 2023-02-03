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
}

module.exports = AdminRepository;
