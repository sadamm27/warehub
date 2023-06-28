'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Revenue,{foreignKey: 'user_id'})
      User.hasMany(models.Warehouse,{foreignKey: 'user_id'})
      User.hasMany(models.Vendor,{foreignKey: 'user_id'})
      User.hasMany(models.Expense,{foreignKey: 'user_id'})
      User.hasMany(models.Product,{foreignKey: 'user_id'})
      User.hasMany(models.Order,{foreignKey: 'user_id'})
      User.hasMany(models.Customer,{foreignKey: 'user_id'})
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        },
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};