const ItemRepository = require('../repositories/item.repository');
const { NotFoundItem } = require('../lib/customerror');
const { Item } = require('../models');

class ItemService {
    itemRepository = new ItemRepository(Item);
    // 아이템 다 불러오기
    findAllItems = async (page, level) => {
        // 전체 상품 수
        const itemsCount = await await this.itemRepository.allItemsCount(level);

        // 총 페이지 수 : 한 페이지당 8명씩
        let totalPage = Math.ceil(itemsCount / 8);

        // 화면에 보여줄 그룹 : 한 그룹당 5개 페이지 띄우기
        let pageGroup = Math.ceil(page / 5);

        // 한 그룹의 마지막 페이지 번호
        let lastPage = pageGroup * 5;

        // 한 그룹의 첫 페이지 번호
        let firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

        // 만약 마지막 페이지 번호가 총 페이지 수 보다 크다면?
        if (lastPage > totalPage) {
            lastPage = totalPage;
        }

        const allItems = await this.itemRepository.findAllItems(page, level);

        const itemList = allItems.map((item) => {
            return {
                ...item.dataValues,
                item_id: item.id,
            };
        });

        return { status: 200, itemsCount, itemList, firstPage, lastPage, totalPage };
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
