const { Item } = require('../models');

class itemRepository {
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
            attribues: ['id', 'name','price', 'image'],
            order: [['createdAt', 'desc']],
        });

        return itemsByLevel;
    };
}

module.exports = itemRepository;
