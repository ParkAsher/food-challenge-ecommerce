const { Basket, Item } = require('../models');

class BasketRepository {
    findHaveItemInBasket = async (user_id, item_id) => {
        const inBasketThatItem = await Basket.findAll({ where: { user_id, item_id } });
        return inBasketThatItem;
    };

    addMyBasket = async (user_id, item_id, count) => {
        return await Basket.create({ user_id, item_id, count });
    };

    updateItemCount = async (user_id, item_id, count) => {
        return await Basket.update({ count }, { where: { user_id, item_id } });
    };

    findItemInBasket = async (user_id) => {
        const inBasketThatItem = await Basket.findAll({
            where: { user_id },
            order: [['id', 'desc']],
            include: [{ model: Item, attributes: ['id', 'name', 'price', 'image'] }],
        });
        return inBasketThatItem;
    };

    deleteItemInBasket = async (user_id, item_id) => {
        const deleteItemInBasket = await Basket.destroy({ where: { user_id, item_id } });
        return deleteItemInBasket;
    };
}

module.exports = BasketRepository;
