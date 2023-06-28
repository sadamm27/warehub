'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCategory.belongsTo(models.Product, { foreignKey: 'product_id' });
      ProductCategory.belongsTo(models.Category, { foreignKey: 'category_id' });

    }
  }
  ProductCategory.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      }
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};