class UserAlreadyExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyExist';
        this.message = '이미 존재하는 이메일입니다.';
    }
    status = 400;
}

module.exports = {
    UserAlreadyExist,
};
