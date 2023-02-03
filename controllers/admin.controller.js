const { pageValidate } = require('../lib/joischema');
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
}

module.exports = AdminController;
