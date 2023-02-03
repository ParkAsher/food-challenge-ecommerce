const CartService = require('../services/basket.service');
const jwt = require('jsonwebtoken');

class CartController {
    cartController = new CartService();

    addMyCart = async (req, res, next) => {
        const { id: item_id } = req.params;
        let { count } = req.body;
        // const { id: user_id } = jwt.verify(req.cookies.accessToken, process.env.COOKIE_SECRET);
        const user_id = 2
        count = Number(count);

        const rummageThroughACart = await this.cartController.findHaveItemInCart(user_id, item_id);

        if (rummageThroughACart.length < 1) {
            const add = await this.cartController.addMyCart(user_id, item_id, count);
            res.json({ data: add });
        } else if (rummageThroughACart) {
            const updateForIncrease = await this.cartController.updateItemCount(
                user_id,
                item_id,
                rummageThroughACart[0].count + count
            );
            res.json({ data: updateForIncrease });
        }
    };
}

module.exports = CartController;
