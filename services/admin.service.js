const { User } = require('../models/index');
const AdminRepository = require('../repositories/admin.repository');

class AdminService {
    adminRepository = new AdminRepository(User);

    getAllUsers = async (page) => {
        try {
            // 전체 회원 수 가져오기
            const usersCount = this.adminRepository.allUsersCount();

            // 총 페이지 수 : 한 페이지당 8명씩
            const totalPage = Math.ceil(usersCount / 8);

            // 화면에 보여줄 그룹 : 한 그룹당 5개 페이지 띄우기
            const pageGroup = Math.ceil(page / 5);

            // 한 그룹의 마지막 페이지 번호
            const lastPage = pageGroup * 5;

            // 한 그룹의 첫 페이지 번호
            const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

            // 만약 마지막 페이지 번호가 총 페이지 수 보다 크다면?
            if (lastPage > totalPage) {
                lastPage = totalPage;
            }

            // 회원 리스트 가져오기
            const userList = await this.adminRepository.getAllUsers(page);

            return { status: 200, userList, firstPage, lastPage, totalPage };
        } catch (error) {
            throw error;
        }
    };
}

module.exports = AdminService;
