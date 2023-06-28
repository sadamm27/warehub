'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
      OrderProduct.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
    }
  }
  OrderProduct.init({
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};
