const { Item } = require('../models');

class ItemRepository {
    findAllItems = async () => {
        const allItems = await Item.findAll({
            attributes: ['id', 'name', 'price', 'image'],
            order: [['createdAt', 'desc']],
        });

        return allItems;
    };

    findItemsByLevel = async (level) => {
        const itemsByLevel = await Item.findAll({
            where: { level },
            attributes: ['id', 'name', 'price', 'image'],
            order: [['createdAt', 'desc']],
        });

        return itemsByLevel;
    };

    findOneItem = async (id) => {
        try {
            return await Item.findByPk(id);
        } catch (err) {
            throw err;
        }
    };
}

module.exports = ItemRepository;
