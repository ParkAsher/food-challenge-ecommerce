const OrderRepository = require('../repositories/order.repository');

class OrderService {
    orderRepository = new OrderRepository();

    addToOrder = async (
        user_id,
        item_id,
        count,
        address,
        order_price,
        order_point,
        receipt_price
    ) => {
        const order = await this.orderRepository.saveOrder(
            user_id,
            item_id,
            count,
            address,
            order_price,
            order_point,
            receipt_price
        );

        return order;
    };

    getBasket = async (user_id) => {
        const basketList = await this.orderRepository.basketList(user_id);

        return basketList.map((item) => {
            return {
                basket_id: item.id,
                item_id: item.item_id,
                itemName: item.Item.name,
                count: item.count,
                itemPrice: item.Item.price
            };
        });
    };
}

module.exports = OrderService;
