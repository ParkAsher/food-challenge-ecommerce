const {
    pageValidate,
    searchByEmailValidate,
    deleteByIdEmailValidate,
    userUpdateDataValidate,
    createItemDataValidate,
    deleteItemDataValidate,
} = require('../lib/joischema');
const AdminService = require('../services/admin.service');

class AdminController {
    adminService = new AdminService();

    getAllUsers = async (req, res, next) => {
        try {
            const { page } = await pageValidate.validateAsync(req.query);

            const { status, usersCount, userList, firstPage, lastPage, totalPage } =
                await this.adminService.getAllUsers(page);

            return res
                .status(status)
                .json({ usersCount, userList, firstPage, lastPage, totalPage });
        } catch (error) {
            next(error);
        }
    };

    searchUser = async (req, res, next) => {
        try {
            const { email } = await searchByEmailValidate.validateAsync(req.params);

            const { status, user } = await this.adminService.searchUser(email);

            return res.status(status).json({ user });
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req, res, next) => {
        try {
            const userInfo = await deleteByIdEmailValidate.validateAsync(req.query);

            const { status, message } = await this.adminService.deleteUser(userInfo);

            return res.status(status).json({ message });
        } catch (error) {
            next(error);
        }
    };

    updateUser = async (req, res, next) => {
        try {
            const userInfo = await userUpdateDataValidate.validateAsync(req.body);

            const { status, message } = await this.adminService.updateUser(userInfo);

            return res.status(status).json({ message });
        } catch (error) {
            next(error);
        }
    };

    imageUpload = async (req, res, next) => {
        try {
            return res.status(200).json({ filePath: res.req.file.location });
        } catch (error) {
            next(error);
        }
    };

    createItem = async (req, res, next) => {
        try {
            const itemInfo = await createItemDataValidate.validateAsync(req.body);

            const { status, message } = await this.adminService.createItem(itemInfo);

            return res.status(status).json({ message });
        } catch (error) {
            next(error);
        }
    };

    getAllItems = async (req, res, next) => {
        try {
            const { page } = await pageValidate.validateAsync(req.query);

            const { status, itemsCount, itemList, firstPage, lastPage, totalPage } =
                await this.adminService.getAllItems(page);

            return res
                .status(status)
                .json({ itemsCount, itemList, firstPage, lastPage, totalPage });
        } catch (error) {
            next(error);
        }
    };

    deleteItem = async (req, res, next) => {
        try {
            const { itemId } = await deleteItemDataValidate.validateAsync(req.query);

            const { status, message } = await this.adminService.deleteItem(itemId);

            return res.status(status).json({ message });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = AdminController;
