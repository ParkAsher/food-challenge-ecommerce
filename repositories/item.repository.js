class ItemRepository {
    constructor(ItemModel) {
        // DI
        this.itemModal = ItemModel;
    }

    allItemsCount = async (level) => {
        return level === '0'
            ? await this.itemModal.count()
            : await this.itemModal.count({
                  where: { level },
              });
    };

    findAllItems = async (page, level) => {
        if (level === '0') {
            return await this.itemModal.findAll({
                attributes: ['id', 'name', 'price', 'image'],
                order: [['createdAt', 'desc']],
                offset: (page - 1) * 8,
                limit: 8,
            });
        } else {
            return await this.itemModal.findAll({
                where: { level },
                attributes: ['id', 'name', 'price', 'image'],
                order: [['createdAt', 'desc']],
                offset: (page - 1) * 8,
                limit: 8,
            });
        }
    };

    findOneItem = async (id) => {
        try {
            return await this.itemModal.findByPk(id);
        } catch (err) {
            throw err;
        }
    };
}

module.exports = ItemRepository;
