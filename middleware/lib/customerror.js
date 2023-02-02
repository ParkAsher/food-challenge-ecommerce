class NotFoundItem extends Error {
  constructor(message) {
      super(message);
      this.name = 'NotFoundItem';
      this.message = '요청받은 리소스를 찾을 수 없습니다.';
  }
  status = 404;
}

module.exports = {
  NotFoundItem
};