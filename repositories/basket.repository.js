const { Basket } = require('../models');

class CartRepository {
    addMyCart = async (user_id, item_id, count) => {
        return await Basket.create({ user_id, item_id, count });
    };
}

module.exports = { CartRepository };
