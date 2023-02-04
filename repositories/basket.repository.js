const { Basket, Item } = require('../models');

class CartRepository {
    findHaveItemInCart = async (user_id, item_id) => {
        const inCartThatItem = await Basket.findAll({ where: { user_id, item_id } });
        return inCartThatItem;
    };

    addMyCart = async (user_id, item_id, count) => {
        return await Basket.create({ user_id, item_id, count });
    };

    updateItemCount = async (user_id, item_id, count) => {
        return await Basket.update({ count }, { where: { user_id, item_id } });
    };

    findItemInCart = async (user_id) => {
        const inCartThatItem = await Basket.findAll({
            where: { user_id },
            include: [{ model: Item, attributes: ['id', 'name', 'price', 'image'] }],
        });
        return inCartThatItem;
    };

    deleteItemInCart = async (user_id, item_id) => {
        const deleteItemInCart = await Basket.destroy({ where: { user_id, item_id } });
        return deleteItemInCart;
    };
}

module.exports = CartRepository;
