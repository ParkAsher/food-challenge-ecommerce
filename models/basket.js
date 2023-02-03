'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Basket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Item }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' });
            this.belongsTo(Item, { foreignKey: 'item_id' });
        }
    }
    Basket.init(
        {
            user_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            item_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            count: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: 'Basket',
        }
    );
    return Basket;
};
