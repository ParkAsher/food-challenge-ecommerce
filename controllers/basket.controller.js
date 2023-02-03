const { CartService } = require('../services/basket.service');
const jwt = require('jsonwebtoken');

class CartController {
    cartController = new CartService();

    addMyCart = async (req, res, next) => {
        const { id: item_id } = req.query;
        const { count } = req.body;
        const { id: user_id } = jwt.verify(req.cookies.accessToken, process.env.COOKIE_SECRET);

        const add = await this.cartController.addMyCart(user_id, item_id, count);

        res.json({ data: add });
    };
}

module.exports = { CartController };
