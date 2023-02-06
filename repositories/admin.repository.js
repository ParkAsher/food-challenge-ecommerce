const { Op } = require('sequelize');

class AdminRepository {
    constructor(UserModel, ItemModel) {
        // DI
        this.userModel = UserModel;
        this.itemModel = ItemModel;
    }

    allUsersCount = async () => {
        try {
            return await this.userModel.count();
        } catch (error) {
            throw error;
        }
    };

    getAllUsers = async (page) => {
        try {
            return await this.userModel.findAll({
                offset: (page - 1) * 8,
                limit: 8,
                order: [['id', 'DESC']],
            });
        } catch (error) {
            throw error;
        }
    };

    searchUser = async (email) => {
        try {
            return await this.userModel.findOne({
                where: { email },
            });
        } catch (error) {
            throw error;
        }
    };

    deleteUser = async (userInfo) => {
        try {
            return await this.userModel.destroy({
                where: {
                    id: userInfo.id,
                    email: userInfo.email,
                },
            });
        } catch (error) {
            throw error;
        }
    };

    updateUser = async (userInfo) => {
        try {
            return await this.userModel.update(
                {
                    name: userInfo.name,
                    nickname: userInfo.nickname,
                    email: userInfo.email,
                    phone: userInfo.phone,
                    point: userInfo.point,
                },
                {
                    where: { id: userInfo.id },
                }
            );
        } catch (error) {
            throw error;
        }
    };

    createItem = async (itemInfo) => {
        try {
            await this.itemModel.create(itemInfo);

            return { status: 200, message: '상품을 등록하였습니다.' };
        } catch (error) {
            throw error;
        }
    };

    allItemsCount = async () => {
        try {
            return await this.itemModel.count();
        } catch (error) {
            throw error;
        }
    };

    getAllItems = async (page) => {
        try {
            return await this.itemModel.findAll({
                offset: (page - 1) * 5,
                limit: 5,
                order: [['id', 'DESC']],
            });
        } catch (error) {
            throw error;
        }
    };

    deleteItem = async (id) => {
        try {
            return await this.itemModel.destroy({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw error;
        }
    };

    updateItem = async (itemInfo) => {
        try {
            return await this.itemModel.update(
                {
                    name: itemInfo.name,
                    price: itemInfo.price,
                    level: itemInfo.level,
                    stock: itemInfo.stock,
                    image: itemInfo.image,
                },
                {
                    where: { id: itemInfo.itemId },
                }
            );
        } catch (error) {
            throw error;
        }
    };

    searchItem = async (name) => {
        try {
            return await this.itemModel.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
                order: [['id', 'DESC']],
            });
        } catch (error) {
            throw error;
        }
    };
}

module.exports = AdminRepository;
