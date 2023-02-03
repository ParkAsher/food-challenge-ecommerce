const { Basket } = require('../models');

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
}

module.exports = CartRepository;
