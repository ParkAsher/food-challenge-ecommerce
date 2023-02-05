'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orderitem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Order, Item}) {
            // define association here
            this.belongsTo(Item, { foreignKey: 'item_id', targetKey: 'id' });
            this.belongsTo(Order, { foreignKey: 'order_id', sourceKey: 'id' });
        }
    }
    Orderitem.init(
        {
            order_id: DataTypes.BIGINT,
            item_id: DataTypes.BIGINT,
            count: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: 'Orderitem',
        }
    );
    return Orderitem;
};
