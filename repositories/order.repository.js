const { sequelize } = require('../models');

/* custom error */
const { NotFoundOrderList } = require('../lib/customerror');
class OrderRepository {
    constructor(OrderModel) {
        this.orderModel = OrderModel;
    }

    getOrderInfoByUserId = async (user_id) => {
        try {
            const order = await this.orderModel.findAll({
                where: { user_id },
                attributes: ['id'],
            });

            if (order.length === 0) {
                const error = new NotFoundOrderList();
                throw error;
            }

            const orderIds = order.map((o) => o.id);

            const sql = `select a.order_id, c.createdAt, b.name, a.count, (b.price * a.count) as total_item_price, (b.price * a.count * 0.01) as save_point
            from Orderitems as a
            inner join Items as b
            on a.item_id = b.id
            inner join Orders as c
            on a.order_id = c.id
            where a.order_id In (:orderIds)`;

            const orderList = await sequelize.query(sql, {
                replacements: { orderIds },
                type: sequelize.QueryTypes.SELECT,
            });

            return orderList;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = OrderRepository;
