const OrderRepository = require('../repositories/order.repository');

class OrderService {
    orderRepository = new OrderRepository();
    
    addToOrder = async (user_id, item_id, count, address, order_price, order_point, receipt_price) => {
        const order = await this.orderRepository.saveOrder(
            user_id,
            item_id,
            count,
            address,
            order_price,
            order_point,
            receipt_price
        )
        
        return ;

        }
    }

module.exports = OrderService;
