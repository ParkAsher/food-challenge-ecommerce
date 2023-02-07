const OrderController = require('../../controllers/order.controller.js');

let mockOrderService = {
  addToOrder: jest.fn(),
  getBasket: jest.fn(),
  getOrderInfoByUserId: jest.fn(),
  getAllOrder: jest.fn(),
  findOneOrder: jest.fn(),
  searchOrder: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: jest.fn(),
};

let orderController = new OrderController();
orderController.orderService = mockOrderService;

describe('Layered Architecture Pattern Order Controller Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });

    mockResponse.locals.user = jest.fn(() => {
        return mockResponse
      });
  });

  test('Order Controller getBasketList Method by Success', async () => {
        const getAllBasketItems = [
              {
                "basket_id": 20,
                "item_id": 13,
                "count": 1,
                "itemName": "라오수깐",
                "image": "https://food-challenge-ecommerce.kr.object.ncloudstorage.com/item/1675663593011.PNG",
                "itemPrice": 70000
              },
              {
                "basket_id": 21,
                "item_id": 11,
                "count": 1,
                "itemName": "발롯",
                "image": "https://food-challenge-ecommerce.kr.object.ncloudstorage.com/item/1675663642850.PNG",
                "itemPrice": 12000
              }
            ]

    mockOrderService.getBasket = jest.fn(() => {
      return getAllBasketItems
    });

    await orderController.getBasketList(mockRequest, mockResponse);

    expect(mockOrderService.getBasket).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({ getAllBasketItems });
  });
  

  test('Order Controller saveOrder Method by Success', async () => {
    const saveOrderReqBody = {
        id: 1,
        item_id: 1,
        basketItems: undefined,
        count: 1,
        address: "success",
        order_price: 123,
        order_point: 123,
        receipt_price: 123,
      }

    mockRequest.body = saveOrderReqBody;

    const saveOrder = {
        id: 1,
        basketItems: 'd',
        count: 1,
        address: "success",
        order_price: 123,
        order_point: 123,
        receipt_price: 123,
    };

    mockOrderService.addToOrder = jest.fn(() => saveOrder );

    await orderController.saveOrder(mockRequest, mockResponse);

    expect(mockOrderService.addToOrder).toHaveBeenCalledTimes(1);
    expect(mockOrderService.addToOrder).toHaveBeenCalledWith(
        saveOrderReqBody.user_id,
        saveOrderReqBody.item_id,
        saveOrderReqBody.basketItems,
        saveOrderReqBody.count,
        saveOrderReqBody.address,
        saveOrderReqBody.order_price,
        saveOrderReqBody.order_point,
        saveOrderReqBody.receipt_price,
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ saveOrder });
  });

  test('Order Controller saveOrder Method by Invalid Params Error', async () => {
    mockRequest.body = {};

    await orderController.saveOrder(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorMessage: "주문금액이 없습니다!" })

  });
});