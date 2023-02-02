class UserAlreadyExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyExist';
        this.message = '이미 존재하는 회원입니다.';
    }
    status = 412;
}

module.exports = {
    UserAlreadyExist,
};
