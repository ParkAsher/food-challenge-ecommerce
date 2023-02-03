const ItemRepository = require('../repositories/item.repository');
const { NotFoundItem } = require('../lib/customerror');

class ItemService {
    itemRepository = new ItemRepository();
    // 아이템 다 불러오기
    findAllItems = async () => {
        const allItems = await this.itemRepository.findAllItems();

        return allItems.map((item) => {
            return {
                itemId: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
            };
        });
    };

    //
    findItemsByLevel = async (level) => {
        const itemsByLevel = await this.itemRepository.findItemsByLevel(level);

        return itemsByLevel.map((item) => {
            return {
                itemId: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
            };
        });
    };

    findOneItem = async (id) => {
        try {
            const item = await this.itemRepository.findOneItem(id);

            if (!item) {
                const error = new NotFoundItem();
                throw error;
            }

            return item;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = ItemService;
