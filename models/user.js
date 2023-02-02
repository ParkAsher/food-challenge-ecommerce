'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Order, Basket }) {
            // define association here
            this.hasMany(Order, { foreignKey: 'user_id' });
            this.hasMany(Basket, { foreignKey: 'user_id' });
        }
    }
    User.init(
        {
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            nickname: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            phone: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            point: {
                defaultValue: 0,
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
