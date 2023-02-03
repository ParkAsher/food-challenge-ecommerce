const CartRepository = require('../repositories/basket.repository');

class CartService {
    cartRepository = new CartRepository();

    findHaveItemInCart = async (user_id, item_id) => {
        return await this.cartRepository.findHaveItemInCart(user_id, item_id);
    };

    addMyCart = async (user_id, item_id, count) => {
        return await this.cartRepository.addMyCart(user_id, item_id, count);
    };

    updateItemCount = async (user_id, item_id, count) => {
        return await this.cartRepository.updateItemCount(user_id, item_id, count);
    };
}

module.exports = CartService;
