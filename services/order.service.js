const { Order } = require('../models/index');
const moment = require('moment');
const OrderRepository = require('../repositories/order.repository');

class OrderService {
    orderRepository = new OrderRepository(Order);

    getOrderInfoByUserId = async (user_id) => {
        try {
            // user_id로 넘긴 데이터를 받아옴
            const orderList = await this.orderRepository.getOrderInfoByUserId(user_id);

            return orderList.map((o) => {
                return {
                    ...o,
                    createdAt: moment(o.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                    save_point: parseInt(o.save_point),
                };
            });
        } catch (error) {
            throw error;
        }
    };
}

module.exports = OrderService;
