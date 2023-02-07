const BasketRepository = require('../repositories/basket.repository');

class BasketService {
    basketRepository = new BasketRepository();

    addToBasket = async (user_id, item_id, count) => {
        const myItems = await this.basketRepository.findHaveItemInBasket(user_id, item_id);
        if (myItems.length < 1) {
            return await this.basketRepository.addMyBasket(user_id, item_id, count);
        }
        
        const updateCount = myItems[0].count + count

        return await this.basketRepository.updateItemCount(user_id, item_id, updateCount);
    };

    findItemInBasket = async (user_id) => {
        const findAll = await this.basketRepository.findItemInBasket(user_id);
        if (!findAll[0]) {
            return { myItem: [], totalPrice: 0 };
        }

        const myItem = await findAll.map((item) => {
            return {
                id: item.Item.id,
                name: item.Item.name,
                count: item.count,
                price: item.Item.price,
                totalPrice: item.Item.price * item.count,
                point: item.Item.price * item.count * (5 / 100),
                image: item.Item.image,
            };
        });

        let totalPrice = 0;
        for (let i = 0; i < myItem.length; i++) {
            totalPrice += myItem[i].totalPrice;
        }
        return { myItem, totalPrice };
    };

    deleteItemInBasket = async (user_id, item_id) => {
        const deleteItem = await this.basketRepository.deleteItemInBasket(user_id, item_id);
        return deleteItem;
    };
}

module.exports = BasketService;
