const CartService = require('../services/basket.service');
const jwt = require('jsonwebtoken');

class CartController {
    cartController = new CartService();

    addMyCart = async (req, res, next) => {
        const { id: item_id } = req.params;
        let { count } = req.body;
        const { id: user_id } = jwt.verify(req.cookies.accessToken, process.env.COOKIE_SECRET);
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

    getInfoInMyCart = async (req, res, next) => {
        const { id: user_id } = res.locals.user;

        const MyCartInfo = await this.cartController.findItemInCart(user_id);

        res.json({ data: MyCartInfo });
    };

    deleteItemInCart = async (req, res, next) => {
        const { id: user_id } = res.locals.user;
        const { item_id } = req.body;

        const deleteItem = await this.cartController.deleteItemInCart(user_id, item_id);

        res.json({ data: deleteItem });
    };
}

module.exports = CartController;
