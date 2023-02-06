const ItemService = require('../services/item.service');

class ItemContorller {
    itemService = new ItemService();

    getAllItems = async (req, res, next) => {
        const { page, level } = req.query;

        console.log(page, level);

        const { status, itemsCount, itemList, firstPage, lastPage, totalPage } =
            await this.itemService.findAllItems(page, level);
        return res.status(status).json({ itemsCount, itemList, firstPage, lastPage, totalPage });
    };

    findOneItem = async (req, res, next) => {
        try {
            let { id } = req.params;

            const itemDetail = await this.itemService.findOneItem(id);

            res.json({ data: itemDetail });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = ItemContorller;
