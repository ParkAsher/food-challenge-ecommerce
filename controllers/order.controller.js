const OrderService = require('../services/order.service');

class OrderContorller {
    orderService = new OrderService();

    saveOrder = async (req, res, next) => {
        console.log("LETTTTTTTTTTTTTT")
        // const { id: user_id } = res.locals.user;
        const user_id = 2
        const { 
            id: item_id, 
            count, 
            address, 
            order_price, 
            order_point, 
            receipt_price } = req.query;
            console.log(count, "CHECKKKKKKK")
            

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
}

module.exports = OrderContorller;
