const OrderRepository = require('../repositories/order.repository');

class OrderService {
    orderRepository = new OrderRepository();

    addToOrder = async (
        user_id,
        item_id,
        basketItems,
        count,
        address,
        order_price,
        order_point,
        receipt_price
    ) => {
        if (item_id) {
            let order = await this.orderRepository.saveOrder(
                user_id,
                item_id,
                count,
                address,
                order_price,
                order_point,
                receipt_price
            );

            return order;

        } else {
            const basketItemList = basketItems;
            console.log(basketItemList.length)

            for (let i = 0; i < basketItemList.length; i++) {
                let item_id = basketItemList[i]['item_id'];
                let count = basketItemList[i]['count'];

                let order = await this.orderRepository.saveOrder(
                    user_id,
                    item_id,
                    count,
                    address,
                    order_price,
                    order_point,
                    receipt_price
                );

                return order;
            }
        }
    };

    getBasket = async (user_id) => {
        const basketList = await this.orderRepository.basketList(user_id);

        return basketList.map((item) => {
            return {
                basket_id: item.id,
                item_id: item.item_id,
                itemName: item.Item.name,
                count: item.count,
                itemPrice: item.Item.price,
            };
        });
    };
}

module.exports = OrderService;
