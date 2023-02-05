const OrderService = require('../services/order.service');

class OrderContorller {
    orderService = new OrderService();

    saveOrder = async (req, res, next) => {
        const { id: user_id } = res.locals.user;
        const { id: item_id, count, address, order_price, order_point, receipt_price } = req.query;

        const saveOrder = await this.orderService.addToOrder(
            user_id,
            item_id,
            count,
            address,
            order_price,
            order_point,
            receipt_price
        );

        res.status(201).json({ saveOrder });
    };

    getBasketList = async(req, res, next) => {
        // const { id: user_id } = res.locals.user;
        const user_id = 5
        const getAllBasketItems = await this.orderService.getBasket(user_id)

        res.status(200).json({getAllBasketItems});

    };
}

module.exports = OrderContorller;
