const OrderRepository = require('../repositories/order.repository');
const { Order } = require('../models/index');
const moment = require('moment');

class OrderService {
    orderRepository = new OrderRepository(Order);

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
        const accumulatePoint = order_price * 0.05;

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
            await this.orderRepository.saveOrderItem(order_id, item_id, count);

            return saveOrder;
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

    getOrderInfoByUserId = async (user_id, page) => {
        try {
            // 해당 유저의 주문내역을 전부 가져옴
            const orderList = await this.orderRepository.getOrderInfoByUserId(user_id, page);

            // 해당 유저의 주문내역의 count를 가져옴
            const orderCount = await this.orderRepository.getOrderListCountByUserId(user_id);

            // 총 페이지 수 : 한 페이지당 8개의 주문내역
            let totalPage = Math.ceil(orderCount / 8);

            // 화면에 보여줄 그룹 : 한 그룹당 보여줄 페이지 5개
            let pageGroup = Math.ceil(page / 5);

            // 한 그룹의 마지막 페이지 번호
            let lastPage = pageGroup * 5;

            // 한 그룹의 첫 페이지 번호
            let firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

            // 만약 마지막 페이지 번호가 총 페이지 수 보다 크다면?
            if (lastPage > totalPage) {
                lastPage = totalPage;
            }

            const customOrderList = orderList.map((o) => {
                return {
                    ...o,
                    createdAt: moment(o.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                    save_point: parseInt(o.save_point),
                };
            });

            return {
                status: 200,
                orderList: customOrderList,
                firstPage,
                lastPage,
                totalPage,
            };
        } catch (error) {
            throw error;
        }
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
