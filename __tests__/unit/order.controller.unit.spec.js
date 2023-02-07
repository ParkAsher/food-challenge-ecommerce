const OrderController = require('../../controllers/order.controller.js');

// posts.controller.js 에서는 아래 5개의 Method만을 사용합니다.
let mockOrderService = {
  saveOrder: jest.fn(),
  getBasketList: jest.fn(),
  getOrderInfoByUserId: jest.fn(),
  orderList: jest.fn(),
  findOneOrder: jest.fn(),
  searchOrder: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

let orderController = new OrderController();
// orderController의 Service를 Mock Service로 변경
orderController.orderService = mockOrderService;

describe('Layered Architecture Pattern Order Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화

    // 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야한다
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('Order Controller getOrders Method by Success', async () => {
    // OrderService의 orderList Method를 실행했을 때 Return 값을 변수로 선언
    const ordersReturnValue = [
      {
        postId: 2,
        nickname: 'Nickname_2',
        title: 'Title_2',
        createdAt: new Date('07 October 2011 15:50 UTC'),
        updatedAt: new Date('07 October 2011 15:50 UTC'),
      },
      {
        postId: 1,
        nickname: 'Nickname_1',
        title: 'Title_1',
        createdAt: new Date('06 October 2011 15:50 UTC'),
        updatedAt: new Date('06 October 2011 15:50 UTC'),
      },
    ];

    // PostService의 findAllPost Method를 실행했을 때 Return 값을 postsReturnValue 변수로 설정합니다.
    mockPostService.findAllPost = jest.fn(() => {
      return postsReturnValue
    });

    // PostsController의 getPosts Method를 실행합니다.
    await postsController.getPosts(mockRequest, mockResponse);

    /** PostsController.getPosts 비즈니스 로직 **/
    // 1. PostService의 findAllPost Method를 1회 호출합니다.
    // 2. res.status는 1번 호출되고, 200의 값을 반환합니다.
    // 3. findAllPost Method에서 반환된 posts 변수의 값을 res.json Method를 이용해 { data: posts }의 형식으로 반환합니다.

    // 1. PostService의 findAllPost Method를 1회 호출합니다.
    expect(mockPostService.findAllPost).toHaveBeenCalledTimes(1);

    // 2. res.status는 1번 호출되고, 200의 값을 반환합니다.
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // 3. findAllPost Method에서 반환된 posts 변수의 값을 res.json Method를 이용해 { data: posts }의 형식으로 반환합니다.
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: postsReturnValue,
    });
  });

  test('Posts Controller createPost Method by Success', async () => {
    // PostsController의 createPost Method가 실행되기 위한 Body 입력 인자들입니다.
    const createPostRequestBodyParams = {
      nickname: 'Nickname_Success',
      password: 'Password_Success',
      title: 'Title_Success',
      content: 'Content_Success',
    };

    // 입력 인자를 createPost Method를 실행할 때 삽입하지않고, mockRequest의 body를 createPostRequestBodyParams 변수로 설정합니다.
    mockRequest.body = createPostRequestBodyParams;

    // PostService의 createPost의 Return 값을 설정하는 변수입니다.
    const createPostReturnValue = {
      postId: 90,
      nickname: 'Nickname_Success',
      title: 'Title_Success',
      content: 'Content_Success',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    // PostService.createPost Method의 Return 값을 createPostReturnValue 변수로 설정합니다.
    mockPostService.createPost = jest.fn(() => createPostReturnValue);

    // PostsController의 createPost Method를 실행합니다.
    await postsController.createPost(mockRequest, mockResponse);

    /** PostsController.createPost 성공 케이스 **/
    // 1. req.body에 들어있는 값을 바탕으로 PostService.cretePost가 호출됩니다.
    // 2. res.status는 1번 호출되고, 201의 값으로 호출됩니다.
    // 3. PostService.cretePost에서 반환된 createPostData 변수를 이용해 res.json Method가 호출됩니다.

    // 1. req.body에 들어있는 값을 바탕으로 PostService.cretePost가 호출됩니다.
    expect(mockPostService.createPost).toHaveBeenCalledTimes(1);
    expect(mockPostService.createPost).toHaveBeenCalledWith(
      createPostRequestBodyParams.nickname,
      createPostRequestBodyParams.password,
      createPostRequestBodyParams.title,
      createPostRequestBodyParams.content
    );

    // 2. res.status는 1번 호출되고, 201의 값으로 호출됩니다.
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    // 3. PostService.cretePost에서 반환된 createPostData 변수를 이용해 res.json Method가 호출됩니다.
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createPostReturnValue,
    });
  });

  test('Posts Controller createPost Method by Invalid Params Error', async () => {
    // PostsController의 createPost Method가 실행될 때 에러가 발생하는 Body 입력 인자
    mockRequest.body = {};

    // PostsController의 createPost Method를 실행합니다.
    await postsController.createPost(mockRequest, mockResponse);

    /** PostsController.createPost 에러 케이스 by InvalidParamsError **/
    // 1-1. req.body에 들어있는 값을 바탕으로 각 변수들이 객체 구조분해 할당됩니다.
    // 1-2. 필수로 전달되어야 하는 title 값이 존재하지 않아 InvalidParamsError가 발생합니다.
    // 1-3. res.status는 1번 호출되고, 400번의 Http Status Code가 호출됩니다.
    // 2. res.json의 값은 { errorMessage: "InvalidParamsError" }의 형식을 가집니다.


    // 1-3. res.status는 1번 호출되고, 400번의 Http Status Code가 호출됩니다.
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    // 2. res.json Method가 호출될 때 { errorMessage: "InvalidParamsError" }의 형식을 가집니다.
    expect(mockResponse.json).toHaveBeenCalledWith({ errorMessage: "InvalidParamsError" })

  });
});