const BasketService = require('../../services/basket.service');

let user_id = 9;
let item_id = '3';
let count = 3;

let mockBasketRepository = {
    findHaveItemInBasket: jest.fn(),
    addMyBasket: jest.fn(),
    updateItemCount: jest.fn(),
    findItemInBasket: jest.fn(user_id),
    deleteItemInBasket: jest.fn(),
    afterOrderdeleteItemInBasket: jest.fn(),
};

let basketService = new BasketService();
// postService의 Repository를 Mock Repository로 변경합니다.
basketService.basketRepository = mockBasketRepository;

describe('Layered Architecture Pattern Basket Service Unit Test', () => {
    // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
    });

    // test('Posts Service addToBasket Method By Add', async (user_id, item_id, count) => {
    //     // TODO: 여기에 코드를 작성해야합니다.
    //     user_id = 9;
    //     item_id = '3';
    //     count = 3;
    //     const findHaveItemInBasketReturnValue = [];

    //     const addToBasketAddReturnValue = {
    //         id: 14,
    //         user_id: 9,
    //         item_id: '3',
    //         count: 3,
    //         updatedAt: new Date('2023-02-07T10:22:25.136Z'),
    //         createdAt: new Date('2023-02-07T10:22:25.136Z'),
    //     };

    //     mockBasketRepository.findHaveItemInBasket = jest.fn(() => {
    //         return findHaveItemInBasketReturnValue;
    //     });

    //     const myItems = await basketService.addToBasket(user_id, item_id, count);
    //     expect(myItems).toEqual(addToBasketAddReturnValue);
    // });

    // test('Posts Service findItemInBasket Method By Update', async (user_id, item_id, count) => {
    //     // TODO: 여기에 코드를 작성해야합니다.
    // });

    // test('Posts Service findItemInBasket Method By Success', async (user_id) => {
    //     // TODO: 여기에 코드를 작성해야합니다.
    // });

    test('Posts Service findItemInBasket Method By ', async (user_id) => {
        // TODO: 여기에 코드를 작성해야합니다.
        const findItemInBasketValue = [
            {
                id: 13,
                user_id: 9,
                item_id: 3,
                count: 3,
                createdAt: '2023-02-07T10:22:25.000Z',
                updatedAt: '2023-02-07T10:22:25.000Z',
                Item: [
                    {
                        id: 3,
                        name: '바퀴벌레',
                        price: 1200,
                        image: 'https://food-challenge-ecommerce.kr.object.ncloudstorage.com/item/1675688434941.jpg',
                    },
                ],
            },
        ];
        
        mockBasketRepository.findItemInBasket.mockResolvedValue(findItemInBasketValue)
        // mockBasketRepository.findItemInBasket = jest.fn(() => {
        //     return findItemInBasketValue;
        // });

        const myItems = await basketService.findItemInBasket(1);
        expect(myItems).toEqual(findItemInBasketValue);
    });
});
