class UserAlreadyExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyExist';
        this.message = '이미 존재하는 회원입니다.';
    }
    status = 412;
}

class UserNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFound';
        this.message = '회원이 존재하지 않습니다.';
    }
    status = 412;
}

class IncorrectPassword extends Error {
    constructor(message) {
        super(message);
        this.name = 'IncorrectPassword';
        this.message = '비밀번호가 일치하지 않습니다.';
    }
    status = 412;
}

class TokenNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenNotFound';
        this.message = '토큰이 유효하지 않습니다. 다시 로그인 해주세요.';
    }
    status = 401;
}

module.exports = {
    UserAlreadyExist,
    UserNotFound,
    IncorrectPassword,
    TokenNotFound,
};
