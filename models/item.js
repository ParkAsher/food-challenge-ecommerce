'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Orderitem, Basket }) {
            // define association here
            this.hasMany(Orderitem, { foreignKey: 'item_id', sourceKey: 'id' });
            this.hasMany(Basket, { foreignKey: 'item_id', sourceKey: 'id' });
        }
    }
    Item.init(
        {
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            level: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            image: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            stock: {
                defaultValue: 1000,
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: 'Item',
        }
    );
    return Item;
};
