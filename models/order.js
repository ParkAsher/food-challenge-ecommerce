'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Orderitem }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
            this.hasMany(Orderitem, { foreignKey: 'order_id', sourceKey: 'id' });
        }
    }
    Order.init(
        {
            user_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            order_price: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            order_point: {
                defaultValue: 0,
                type: DataTypes.BIGINT,
            },
            receipt_price: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );
    return Order;
};
