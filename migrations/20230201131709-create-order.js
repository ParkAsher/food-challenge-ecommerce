'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            order_price: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            order_point: {
                defaultValue: 0,
                type: Sequelize.BIGINT,
            },
            receipt_price: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Orders');
    },
};
