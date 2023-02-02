const { NotFoundItem } = require('../middleware/lib/customerror');
const { ItemRepository } = require('../repositories/item.repository');

class ItemService {
    itemRepository = new ItemRepository();

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

module.exports = { ItemService };
