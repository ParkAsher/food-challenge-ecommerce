const { UserAlreadyExist } = require('../lib/customerror');
const { User, Order, Orderitem, Basket } = require('../models');

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
        const orderPoint = Number(order_point);

        // Order 테이블 저장
        const orderTable = await Order.create({
            user_id,
            address,
            order_price,
            order_point: orderPoint,
            receipt_price,
        });

        // OrderItem 테이블 저장
        const orderItemTable = await Orderitem.create({
            order_id: orderTable.id,
            item_id,
            count,
        });

        // 사용한 포인트 업데이트
        if (orderPoint > 0) {
            const findUserPoint = await User.findOne({
                attributes: ['point'],
                where: { id: user_id },
            });

            await User.update(
                {
                    point: findUserPoint.point - orderPoint,
                },
                {
                    where: { id: user_id },
                }
            );
        }
        return { orderTable, orderItemTable };
    };

    basketList = async(user_id) => {
        const basketItems = await Basket.findAll({
            where: {id: user_id}
        })

        return basketItems
    }
}

module.exports = orderRepository;
