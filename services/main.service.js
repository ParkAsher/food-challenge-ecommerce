const ItemRepository = require('../repositories/main.repository');

class ItemService {
    itemRepository = new ItemRepository();
    // 아이템 다 불러오기
    findAllItems = async () => {
        const allItems = await this.itemRepository.findAllItems();

        return allItems.map((item) => {
            return {
                item_id: item.id,
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
                item_id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
            };
        });
    };
}

module.exports = ItemService;
