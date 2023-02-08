const { User, Order, Orderitem, Basket, Item } = require('../models');
const { sequelize } = require('../models');

/* custom error */
const { NotFoundOrderList } = require('../lib/customerror');
const { UserAlreadyExist } = require('../lib/customerror');

class orderRepository {
    constructor(OrderModel) {
        this.orderModel = OrderModel;
    }

    // Order 테이블 저장
    saveOrder = async (
        user_id,
        address,
        order_price,
        orderPoint,
        receipt_price,
        accumulatePoint
    ) => {
        const orderTable = await Order.create({
            user_id,
            address,
            order_price,
            order_point: orderPoint,
            receipt_price,
        });

        const findUserPoint = await User.findOne({
            attributes: ['point'],
            where: { id: user_id },
        });

        // User table point 적립 업데이트
        await User.update(
            {
                point: Math.round(findUserPoint.point + accumulatePoint),
            },
            {
                where: { id: user_id },
            }
        );

        // User table point 사용 차감 업데이트
        if (orderPoint > 0) {
            await User.update(
                {
                    point: Math.round(findUserPoint.point - orderPoint),
                },
                {
                    where: { id: user_id },
                }
            );
        }
        return orderTable;
    };

    // OrderItem 테이블 저장
    saveOrderItem = async (order_id, item_id, count) => {
        const orderItemTable = await Orderitem.create({
            order_id,
            item_id,
            count,
        });

        const findItemStock = await Item.findOne({
            attributes: ['stock'],
            where: { id: item_id },
        });

        const updateStock = findItemStock.stock - Number(count);

        await Item.update(
            {
                stock: updateStock,
            },
            {
                where: { id: item_id },
            }
        );

        return orderItemTable;
    };

    // 장바구니 구매
    // 장바구니 리스트 가져오기
    basketList = async (user_id) => {
        const basketItems = await Basket.findAll({
            where: { user_id },
            include: [{ model: Item, attributes: ['name', 'price', 'image'] }],
        });

        return basketItems;
    };

    // 해당 유저의 주문내역 수
    getOrderListCountByUserId = async (user_id) => {
        try {
            const orderList = await this.orderModel.findAll({
                where: { user_id },
                attributes: ['id'],
            });
            const orderCount = orderList.length;
            return orderCount;
        } catch (error) {
            throw error;
        }
    };

    // 해당 유저의 주문내역을 가져오기
    getOrderInfoByUserId = async (user_id, page) => {
        try {
            const order = await this.orderModel.findAll({
                where: { user_id },
                attributes: ['id'],
                offset: (page - 1) * 8,
                limit: 8,
                order: [['id', 'DESC']],
            });

            if (order.length === 0) {
                const error = new NotFoundOrderList();
                throw error;
            }

            const orderIds = order.map((o) => o.id);

            const sql = `select a.order_id, c.createdAt, b.name, a.count, (b.price * a.count) as total_item_price, (b.price * a.count * 0.05) as save_point
            from Orderitems as a
            inner join Items as b
            on a.item_id = b.id
            inner join Orders as c
            on a.order_id = c.id
            where a.order_id In (:orderIds)
            order by c.createdAt DESC`;

            const orderList = await sequelize.query(sql, {
                replacements: { orderIds },
                type: sequelize.QueryTypes.SELECT,
            });

            return orderList;
        } catch (error) {
            throw error;
        }
    };

    allOrderList = async (page) => {
        const { count, rows } = await Order.findAndCountAll({
            attributes: [
                'id',
                'address',
                'order_price',
                'order_point',
                'receipt_price',
                'createdAt',
            ],
            include: [{ model: User, attributes: ['name', 'phone', 'nickname', 'email'] }],
            offset: (page - 1) * 8,
            limit: 8,
            order: [['id', 'DESC']],
        });
        return { count, rows };
    };

    searchEmail = async (email) => {
        return await User.findOne({ where: { email } });
    };
    searchOrder = async (id) => {
        const rows = await Order.findAll({
            where: { user_id: id },
            attributes: [
                'id',
                'address',
                'order_price',
                'order_point',
                'receipt_price',
                'createdAt',
            ],
            include: [{ model: User, attributes: ['name', 'phone', 'nickname', 'email'] }],
            order: [['id', 'DESC']],
        });
        return { rows };
    };

    findOneOrder = async (id) => {
        const order = await Orderitem.findAll({
            where: { order_id: id },
            attributes: ['order_id', 'count'],
            include: [
                {
                    model: Item,
                    attributes: ['name', 'price'],
                },
            ],
        });
        return order;
    };
}

module.exports = orderRepository;
