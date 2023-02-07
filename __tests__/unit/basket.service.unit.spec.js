const BasketService = require('../../services/basket.service');

let mockBasketRepository = {
    findHaveItemInBasket: jest.fn(),
    addMyBasket: jest.fn(),
    updateItemCount: jest.fn(),
    findItemInBasket: jest.fn(),
    deleteItemInBasket: jest.fn(),
    afterOrderdeleteItemInBasket: jest.fn(),
};

let basketService = new BasketService();
basketService.basketRepository = mockBasketRepository;

describe('Layered Architecture Pattern Basket Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Basket Service findItemInBasket Method By Array', async () => {
        const findItemInBasketValue = [
            {
                id: 13,
                user_id: 9,
                item_id: 3,
                count: 3,
                createdAt: '2023-02-07T10:22:25.000Z',
                updatedAt: '2023-02-07T10:22:25.000Z',
                Item: {
                    id: 3,
                    name: '바퀴벌레',
                    price: 1200,
                    image: 'https://food-challenge-ecommerce.kr.object.ncloudstorage.com/item/1675688434941.jpg',
                },
            },
            {
                id: 13,
                user_id: 9,
                item_id: 7,
                count: 3,
                createdAt: '2023-02-07T10:22:25.000Z',
                updatedAt: '2023-02-07T10:22:25.000Z',
                Item: {
                    id: 7,
                    name: '참치눈알',
                    price: 25000,
                    image: 'https://food-challenge-ecommerce.kr.object.ncloudstorage.com/item/1675688434941.jpg',
                },
            },
        ];

        mockBasketRepository.findItemInBasket.mockResolvedValue(findItemInBasketValue);

        const myItems = await basketService.findItemInBasket();
        expect(myItems).toEqual({
            myItem: [
                {
                    id: 3,
                    name: '바퀴벌레',
                    count: 3,
                    price: 1200,
                    totalPrice: 3600,
                    point: 180,
                    image: 'https://food-challenge-ecommerce.kr.object.ncloudstorage.com/item/1675688434941.jpg',
                },
                {
                    id: 7,
                    name: '참치눈알',
                    count: 3,
                    price: 25000,
                    totalPrice: 75000,
                    point: 3750,
                    image: 'https://food-challenge-ecommerce.kr.object.ncloudstorage.com/item/1675688434941.jpg',
                },
            ],
            totalPrice: 78600,
        });
    });

    test('Basket Service findItemInBasket Method By null', async () => {
        const findItemInBasketValue = [];

        mockBasketRepository.findItemInBasket.mockResolvedValue(findItemInBasketValue);

        const myItems = await basketService.findItemInBasket();
        expect(myItems).toEqual({
            myItem: [],
            totalPrice: 0,
        });
    });

    test('Basket Service findItemInBasket Method By null', async () => {
        const findItemInBasketValue = [];

        mockBasketRepository.findItemInBasket.mockResolvedValue(findItemInBasketValue);

        const myItems = await basketService.findItemInBasket();
        expect(myItems).toEqual({
            myItem: [],
            totalPrice: 0,
        });
    });

    test('Basket Service deleteItemInBasket Method', async () => {
        const deleteItemInBasketValue = 1;

        mockBasketRepository.deleteItemInBasket.mockResolvedValue(deleteItemInBasketValue);

        const myItems = await basketService.deleteItemInBasket();
        expect(myItems).toEqual(1);
    });

    test('Basket Service deleteItemInBasket Method', async () => {
        const deleteItemInBasketValue = 0;

        mockBasketRepository.deleteItemInBasket.mockResolvedValue(deleteItemInBasketValue);

        const myItems = await basketService.deleteItemInBasket();
        expect(myItems).toEqual(0);
    });

    test('Basket Service addToBasket Method By null', async () => {
        const findHaveItemInBasketValue = [];
        const addMyBasketValue = {
            id: 17,
            user_id: 9,
            item_id: '4',
            count: 3,
            updatedAt: '2023-02-07T13:31:40.873Z',
            createdAt: '2023-02-07T13:31:40.873Z',
        };

        mockBasketRepository.findHaveItemInBasket.mockResolvedValue(findHaveItemInBasketValue);
        mockBasketRepository.addMyBasket.mockResolvedValue(addMyBasketValue);

        const myItems = await basketService.addToBasket(9, 4, 3);

        expect(myItems).toEqual({
            id: 17,
            user_id: 9,
            item_id: '4',
            count: 3,
            updatedAt: '2023-02-07T13:31:40.873Z',
            createdAt: '2023-02-07T13:31:40.873Z',
        });
    });

    test('Basket Service addToBasket Method By length', async () => {
        const findHaveItemInBasketValue = [
            {
                id: 19,
                user_id: 9,
                item_id: 6,
                count: 3,
                createdAt: '2023-02-07T13:35:21.000Z',
                updatedAt: '2023-02-07T13:35:21.000Z',
            },
        ];
        const updateItemCountValue = 1;

        mockBasketRepository.findHaveItemInBasket.mockResolvedValue(findHaveItemInBasketValue);
        mockBasketRepository.updateItemCount.mockResolvedValue(updateItemCountValue);

        const myItems = await basketService.addToBasket(9, 6, 6);

        expect(myItems).toEqual(1);
    });
});
