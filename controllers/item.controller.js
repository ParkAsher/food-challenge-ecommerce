const ItemService = require('../services/item.service');
const jwt = require("jsonwebtoken")

class ItemContorller {
    itemService = new ItemService();

    getAllItems = async (req, res, next) => {
        const items = await this.itemService.findAllItems();
        res.status(200).json({ items });
    };

    getItemsByLevel = async (req, res, next) => {
        const { level } = req.params;
        const itemsByLevel = await this.itemService.findItemsByLevel(level);

        return res.status(200).json({ itemsByLevel });
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
