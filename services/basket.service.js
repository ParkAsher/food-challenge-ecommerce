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

    findItemInCart = async (user_id) => {
        const findAll = await this.cartRepository.findItemInCart(user_id);

        if (findAll.length < 1) {
            return '텅텅 시스템';
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

    deleteItemInCart = async (user_id, item_id) => {
        const deleteItem = await this.cartRepository.deleteItemInCart(user_id, item_id)
        return deleteItem
    }
}

module.exports = CartService;
