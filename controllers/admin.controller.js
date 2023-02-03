const { pageValidate } = require('../lib/joischema');
const AdminService = require('../services/admin.service');

class AdminController {
    adminService = new AdminService();

    getAllUsers = async (req, res, next) => {
        try {
            const { page } = await pageValidate.validateAsync(req.query);

            const { status, userList, firstPage, lastPage, totalPage } =
                await this.adminService.getAllUsers(page);

            return res.status(status).json({ userList, firstPage, lastPage, totalPage });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = AdminController;
