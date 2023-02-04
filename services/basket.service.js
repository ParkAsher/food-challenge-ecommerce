const BasketRepository = require('../repositories/basket.repository');

class BasketService {
    basketRepository = new BasketRepository();

    findHaveItemInBasket = async (user_id, item_id) => {
        return await this.basketRepository.findHaveItemInBasket(user_id, item_id);
    };

    addMyBasket = async (user_id, item_id, count) => {
        return await this.basketRepository.addMyBasket(user_id, item_id, count);
    };

    updateItemCount = async (user_id, item_id, count) => {
        return await this.basketRepository.updateItemCount(user_id, item_id, count);
    };

    findItemInBasket = async (user_id) => {
        const findAll = await this.basketRepository.findItemInBasket(user_id);

        if (findAll.length < 1) {
            return
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
        return myItem;
    };

    deleteItemInBasket = async (user_id, item_id) => {
        const deleteItem = await this.basketRepository.deleteItemInBasket(user_id, item_id)
        return deleteItem
    }
}

module.exports = BasketService;
