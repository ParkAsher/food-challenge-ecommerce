const { UserAlreadyExist } = require('../lib/customerror');
const { User, Order, Orderitem, Basket, Item } = require('../models');

class orderRepository {
    // Order 테이블 저장
    saveOrder = async (user_id, address, order_price, order_point, receipt_price) => {
        const orderPoint = Number(order_point);
        const orderTable = await Order.create({
            user_id,
            address,
            order_price,
            order_point: orderPoint,
            receipt_price,
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
        return orderTable;
    };

    // OrderItem 테이블 저장
    saveOrderItem = async (order_id, item_id, count) => {
        const orderItemTable = await Orderitem.create({
            order_id,
            item_id,
            count,
        });
        return orderItemTable;
    };

    // 장바구니 구매
    // 장바구니 리스트 가져오기
    basketList = async (user_id) => {
        const basketItems = await Basket.findAll({
            where: { user_id },
            include: [{ model: Item, attributes: ['price', 'name'] }],
        });

        return basketItems;
    };
}

module.exports = orderRepository;
