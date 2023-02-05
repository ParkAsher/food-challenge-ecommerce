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
        if (item_id) {
            const saveOrder = await this.orderRepository.saveOrder(
                user_id,
                address,
                order_price,
                order_point,
                receipt_price
            );

            const order_id = saveOrder.id;
            await this.orderRepository.saveOrderItem(order_id, item_id, count);

            return saveOrder;
        } else {
            // 장바구니에서 구매한 케이스
            const saveOrder = await this.orderRepository.saveOrder(
                user_id,
                address,
                order_price,
                order_point,
                receipt_price
            );

            const order_id = saveOrder.id;
            // localStorage에 담은 {[]} 을 반복문으로 변수를 뽑아온다
            for (let i = 0; i < basketItems.length; i++) {
                let item_id = basketItems[i]['item_id'];
                let count = basketItems[i]['count'];

                await this.orderRepository.saveOrderItem(order_id, item_id, count);
            }
            return saveOrder;
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

    getAllOrder = async (page) => {
        const { count, rows } = await this.orderRepository.allOrderList(page);

        let totalPage = Math.ceil(count / 8);

        // 화면에 보여줄 그룹 : 한 그룹당 5개 페이지 띄우기
        let pageGroup = Math.ceil(page / 5);

        // 한 그룹의 마지막 페이지 번호
        let lastPage = pageGroup * 5;

        // 한 그룹의 첫 페이지 번호
        let firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

        // 만약 마지막 페이지 번호가 총 페이지 수 보다 크다면?
        if (lastPage > totalPage) {
            lastPage = totalPage;
        }

        const list = rows.map((one) => {
            one.User = !one.User
                ? {
                      name: '공란',
                      nickname: '공란',
                      phone: '공란',
                  }
                : one.User;
            return {
                orderId: one.id,
                name: one.User.name,
                phone: one.User.phone,
                address: one.address,
                order_price: one.order_price,
                order_point: one.order_point,
                receipt_price: one.receipt_price,
                createdAt: one.createdAt,
            };
        });
        return { count, list, firstPage, lastPage, totalPage };
    };

    findOneOrder = async (id) => {
        const order = await this.orderRepository.findOneOrder(id);
        if (!order) {
            return;
        }
        const orderItemList = order.map((item) => {
            return {
                order_id: item.order_id,
                name: item.Item.name,
                price: item.Item.price,
                count: item.count,
                totalPrice: item.count * item.Item.price,
            };
        });
        return orderItemList;
    };
}

module.exports = OrderService;
