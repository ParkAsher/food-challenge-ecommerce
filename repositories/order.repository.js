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

        const orderTable = await Order.create({
            user_id,
            address,
            order_price,
            order_point,
            receipt_price,
        });

        const orderItemTable = await Orderitem.create({
            order_id: orderTable.id,
            item_id,
            count,
        });
        
        return { orderTable, orderItemTable }
    };
}

module.exports = orderRepository;
