const OrderRepository = require('../repositories/order.repository');

class OrderService {
    orderRepository = new OrderRepository();

    addToOrder = async (
        user_id,
        item_id,
        basketItems,
        count,
        address,
        order_price,
        order_point,
        receipt_price
    ) => {

        const orderPoint = Number(order_point);
        const accumulatePoint = order_price * 0.05

        if (item_id) {
            const saveOrder = await this.orderRepository.saveOrder(
                user_id,
                address,
                order_price,
                orderPoint,
                receipt_price,
                accumulatePoint
            );

            const order_id = saveOrder.id;
            await this.orderRepository.saveOrderItem(
                order_id,
                item_id,
                count
            );

            return saveOrder
        } else {
            // 장바구니에서 구매한 케이스
            const saveOrder = await this.orderRepository.saveOrder(
                user_id,
                address,
                order_price,
                order_point,
                receipt_price,
                accumulatePoint
            );

            const order_id = saveOrder.id;
            // localStorage에 담은 {[]} 을 반복문으로 변수를 뽑아온다
            for (let i = 0; i < basketItems.length; i++) {
                let item_id = basketItems[i]['item_id'];
                let count = basketItems[i]['count'];

                await this.orderRepository.saveOrderItem(
                    order_id,
                    item_id,
                    count

                );
            }
            return saveOrder
        }
    };

    getBasket = async (user_id) => {
        const basketList = await this.orderRepository.basketList(user_id);

        return basketList.map((item) => {
            return {
                basket_id: item.id,
                item_id: item.item_id,
                itemName: item.Item.name,
                count: item.count,
                itemPrice: item.Item.price,
            };
        });
    };
}

module.exports = OrderService;
