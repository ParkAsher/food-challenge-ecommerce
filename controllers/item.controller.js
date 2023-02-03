const { ItemService } = require('../services/item.service');
const jwt = require("jsonwebtoken")

class ItemController {
    itemService = new ItemService();

    findOneItem = async (req, res, next) => {
        try {
            let { id } = req.query
    
            const oneItem = await this.itemService.findOneItem(id);
    
            res.json({ data: oneItem });
        } catch (err) {
            next(err)
        }
    };
}

module.exports = { ItemController };
