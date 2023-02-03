class UserAlreadyExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyExist';
        this.message = '이미 존재하는 회원입니다.';
    }
    status = 412;
}

class NotFoundItem extends Error {
  constructor(message) {
      super(message);
      this.name = 'NotFoundItem';
      this.message = '요청받은 리소스를 찾을 수 없습니다.';
  }
  status = 404;
}

module.exports = {
    UserAlreadyExist,
    NotFoundItem
};
