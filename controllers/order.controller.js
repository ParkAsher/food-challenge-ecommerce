const OrderService = require('../services/order.service');

class OrderContorller {
    orderService = new OrderService();

    saveOrder = async (req, res, next) => {
        const { id: user_id } = res.locals.user;
        const {
            id: item_id,
            basketItems,
            count,
            address,
            order_price,
            order_point,
            receipt_price,
        } = req.body;

        const saveOrder = await this.orderService.addToOrder(
            user_id,
            item_id,
            basketItems,
            count,
            address,
            order_price,
            order_point,
            receipt_price
        );

        res.status(201).json({ saveOrder });
    };

    getBasketList = async (req, res, next) => {
        const { id: user_id } = res.locals.user;
        const getAllBasketItems = await this.orderService.getBasket(user_id);

        res.status(200).json({ getAllBasketItems });
    };

    orderList = async (req, res, next) => {
        const page = req.query.page || 1;
        const { count, list, firstPage, lastPage, totalPage } = await this.orderService.getAllOrder(
            page
        );
        res.json({ count, firstPage, lastPage, totalPage, list });
    };

    findOneOrder = async (req, res, next) => {
        const { id } = req.params;
        const order = await this.orderService.findOneOrder(id);
        res.json(order);
    };
}

module.exports = OrderContorller;
