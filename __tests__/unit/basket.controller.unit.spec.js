const BasketController = require('../../controllers/basket.controller');

// posts.controller.js 에서는 아래 5개의 Method만을 사용합니다.
let mockBasketService = {
  findAllPost: jest.fn(),
  findPostById: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

let basket = new BasketController();
// basket의 Service를 Mock Service로 변경합니다.
basket.postService = mockBasketService;