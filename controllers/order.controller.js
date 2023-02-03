const OrderService = require('../services/order.service');

class OrderController {
    orderService = new OrderService();

    getOrderInfoByUserId = async (req, res, next) => {
        try {
            const { id: user_id } = req.params;

            const orderList = await this.orderService.getOrderInfoByUserId(user_id);

            return res.status(200).json({ orderList });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = OrderController;
