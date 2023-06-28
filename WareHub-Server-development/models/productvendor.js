'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductVendor.belongsTo(models.Product, { foreignKey: 'product_id' });
      ProductVendor.belongsTo(models.Vendor, { foreignKey: 'vendor_id' });

    }
  }
  ProductVendor.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      }
  }, {
    sequelize,
    modelName: 'ProductVendor',
  });
  return ProductVendor;
};