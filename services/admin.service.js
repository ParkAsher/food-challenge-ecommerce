const moment = require('moment/moment');
const { User, Item } = require('../models/index');
const AdminRepository = require('../repositories/admin.repository');
const {
    UserNotFound,
    UserNotDeleted,
    UserNotUpdated,
    ItemNotDeleted,
    ItemNotUpdated,
    NotFoundItem,
} = require('../lib/customerror');

class AdminService {
    adminRepository = new AdminRepository(User, Item);

    getAllUsers = async (page) => {
        try {
            // 전체 회원 수 가져오기
            const usersCount = await this.adminRepository.allUsersCount();

            // 총 페이지 수 : 한 페이지당 8명씩
            let totalPage = Math.ceil(usersCount / 8);

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

            // 회원 리스트 가져오기
            const userList = await this.adminRepository.getAllUsers(page);

            const customUserList = userList.map((user) => {
                delete user.dataValues.password;
                return {
                    ...user.dataValues,
                    createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                };
            });

            return {
                status: 200,
                usersCount,
                userList: customUserList,
                firstPage,
                lastPage,
                totalPage,
            };
        } catch (error) {
            throw error;
        }
    };

    searchUser = async (email) => {
        try {
            const user = await this.adminRepository.searchUser(email);
            // 회원이 없다면?
            if (!user) {
                const error = new UserNotFound();
                throw error;
            }

            // 비밀번호 정보 삭제
            delete user.dataValues.password;

            return { status: 200, user };
        } catch (error) {
            throw error;
        }
    };

    deleteUser = async (userInfo) => {
        try {
            const deleteCount = await this.adminRepository.deleteUser(userInfo);

            // sequelize destroy는 삭제한 행 수를 반환한다.
            if (deleteCount === 0) {
                // 조건에 맞지않아 삭제한 것이 없다
                const error = new UserNotDeleted();
                throw error;
            }

            return { status: 200, message: '삭제에 성공했습니다.' };
        } catch (error) {
            throw error;
        }
    };

    updateUser = async (userInfo) => {
        try {
            const [updateCount] = await this.adminRepository.updateUser(userInfo);

            // 만약 해당 id를 가진 유저가 없어서 수정에 실패하였다면?
            if (updateCount === 0) {
                const error = new UserNotUpdated();
                throw error;
            }

            return { status: 200, message: '수정에 성공했습니다.' };
        } catch (error) {
            throw error;
        }
    };

    createItem = async (itemInfo) => {
        try {
            return await this.adminRepository.createItem(itemInfo);
        } catch (error) {
            throw error;
        }
    };

    getAllItems = async (page) => {
        try {
            // 전체 상품 수 가져오기
            const itemsCount = await this.adminRepository.allItemsCount();

            // 총 페이지 수 : 한 페이지당 5개씩
            let totalPage = Math.ceil(itemsCount / 5);

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

            // 회원 리스트 가져오기
            const itemList = await this.adminRepository.getAllItems(page);

            const customItemList = itemList.map((item) => {
                return {
                    ...item.dataValues,
                    createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                };
            });

            return {
                status: 200,
                itemsCount,
                itemList: customItemList,
                firstPage,
                lastPage,
                totalPage,
            };
        } catch (error) {
            throw error;
        }
    };

    deleteItem = async (id) => {
        try {
            const deleteCount = await this.adminRepository.deleteItem(id);

            // sequelize destroy는 삭제한 행 수를 반환한다.
            if (deleteCount === 0) {
                // 조건에 맞지않아 삭제한 것이 없다
                const error = new ItemNotDeleted();
                throw error;
            }

            return { status: 200, message: '삭제에 성공했습니다.' };
        } catch (error) {
            throw error;
        }
    };

    updateItem = async (itemInfo) => {
        try {
            const [updateCount] = await this.adminRepository.updateItem(itemInfo);

            // 만약 해당 id를 가진 유저가 없어서 수정에 실패하였다면?
            if (updateCount === 0) {
                const error = new ItemNotUpdated();
                throw error;
            }

            return { status: 200, message: '수정에 성공했습니다.' };
        } catch (error) {
            throw error;
        }
    };

    searchItem = async (name) => {
        try {
            const itemList = await this.adminRepository.searchItem(name);

            const customItemList = itemList.map((item) => {
                return {
                    ...item.dataValues,
                    createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                };
            });

            return { status: 200, itemList: customItemList };
        } catch (error) {
            throw error;
        }
    };
}

module.exports = AdminService;
