const { Item } = require('../models');

class ItemRepository {
    findOneItem = async (id) => {
        try {
            return await Item.findByPk(id);
        } catch (err) {
            throw err
        }
    };
}

module.exports = { ItemRepository };
