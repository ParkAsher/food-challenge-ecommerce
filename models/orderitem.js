'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orderitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orderitem.init({
    order_id: DataTypes.BIGINT,
    item_id: DataTypes.BIGINT,
    count: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Orderitem',
  });
  return Orderitem;
};