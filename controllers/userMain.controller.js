const ItemService = require('../services/userMain.service');

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
}

module.exports = ItemContorller;
