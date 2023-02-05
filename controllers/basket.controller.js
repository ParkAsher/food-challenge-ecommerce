const BasketService = require('../services/basket.service');
const { UserNotLogined } = require('../lib/customerror');
const userNotLogined = new UserNotLogined();

class BasketController {
    basketController = new BasketService();

    addMyBasket = async (req, res, next) => {
        const { id: item_id } = req.params;
        let { count } = req.body;
        count = Number(count);

        if (!res.locals.user) {
            return next(userNotLogined);
        }
        const { id: user_id } = res.locals.user;

        const rummageThroughABasket = await this.basketController.addToBasket(
            user_id,
            item_id,
            count
        );

        return res.json({ data: rummageThroughABasket });
    };

    getInfoInMyBasket = async (req, res, next) => {
        const { id: user_id } = res.locals.user;

        const { myItem, totalPrice } = await this.basketController.findItemInBasket(user_id);

        res.json({ data: myItem, price: totalPrice });
    };

    deleteItemInBasket = async (req, res, next) => {
        const { id: user_id } = res.locals.user;
        const { item_id } = req.body;

        const deleteItem = await this.basketController.deleteItemInBasket(user_id, item_id);

        res.json({ data: deleteItem });
    };
}

module.exports = BasketController;
