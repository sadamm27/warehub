'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product,{through: models.OrderProduct,foreignKey: 'order_id'})
      Order.hasMany(models.OrderProduct,{foreignKey: 'order_id'})
      Order.belongsTo(models.Customer,{foreignKey: 'customer_id'})
      Order.belongsTo(models.User,{foreignKey: 'user_id'})
      Order.belongsTo(models.Warehouse,{foreignKey: 'warehouse_id'})
    }
  }
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    total_price: {
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};