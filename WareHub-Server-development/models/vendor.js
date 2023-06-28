'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.belongsToMany(models.Product,{through: models.ProductVendor, foreignKey: 'vendor_id'})
      Vendor.belongsTo(models.User,{foreignKey: 'user_id'})
    }
  }
  Vendor.init({
    user_id: {
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
    country: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    }
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};