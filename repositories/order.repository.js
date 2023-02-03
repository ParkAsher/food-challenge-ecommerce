const { Order, Orderitem } = require('../models');

class orderRepository {
    saveOrder = async (
        user_id,
        item_id,
        count,
        address,
        order_price,
        order_point,
        receipt_price
    ) => {
        const saveOrder = await Order.create({
            user_id,
            address,
            order_price,
            order_point,
            receipt_price,
        });

        const saveOrderItem = await Orderitem.create({
            order_id: saveOrder.id,
            item_id,
            count,
        });
    };
}

module.exports = orderRepository;
