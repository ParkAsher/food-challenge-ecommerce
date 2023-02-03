class AdminRepository {
    constructor(UserModel) {
        // DI
        this.userModel = UserModel;
    }
}

module.exports = AdminRepository;
