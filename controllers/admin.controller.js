const AdminService = require('../services/admin.service');

class AdminController {
    adminService = new AdminService();
}

module.exports = AdminController;
