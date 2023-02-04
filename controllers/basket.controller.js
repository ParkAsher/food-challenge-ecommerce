const BasketService = require('../services/basket.service');

class BasketController {
    basketController = new BasketService();

    addMyBasket = async (req, res, next) => {
        const { id: item_id } = req.params;
        let { count } = req.body;
        const { id: user_id } = res.locals.user;
        count = Number(count);

        const rummageThroughABasket = await this.basketController.findHaveItemInBasket(
            user_id,
            item_id
        );

        if (rummageThroughABasket.length < 1) {
            const add = await this.basketController.addMyBasket(user_id, item_id, count);

            res.json({ data: add });
        } else if (rummageThroughABasket) {
            const updateForIncrease = await this.basketController.updateItemCount(
                user_id,
                item_id,
                rummageThroughABasket[0].count + count
            );

            res.json({ data: updateForIncrease });
        }
    };

    getInfoInMyBasket = async (req, res, next) => {
        const { id: user_id } = res.locals.user;

        const {myItem, totalPrice} = await this.basketController.findItemInBasket(user_id);

        res.json({ data: myItem, price: totalPrice});
    };

    deleteItemInBasket = async (req, res, next) => {
        const { id: user_id } = res.locals.user;
        const { item_id } = req.body;

        const deleteItem = await this.basketController.deleteItemInBasket(user_id, item_id);

        res.json({ data: deleteItem });
    };
}

module.exports = BasketController;
