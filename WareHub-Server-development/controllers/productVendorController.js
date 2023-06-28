const { sequelize, ProductVendor, Product, Vendor } = require('../models');
const { Op } = require('sequelize');

class ProductVendorController {

  static async create(req, res, next) {
    const { product_id, vendor_id } = req.body;

    try {
      const productVendor = await sequelize.transaction(async (t) => {
        const createdProductVendor = await ProductVendor.create(
          { product_id, vendor_id },
          { transaction: t }
        );

        return createdProductVendor;
      });

      res.status(201).json(productVendor);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await ProductVendor.findAll({
        
      });
      
    if (data) {
      res.status(200).json(data);
    } else {
      throw { name: 'ErrorNotFound' };
    }
    } catch (err) {
      next(err);
    }
  }
  
  static async getById(req, res, next) {
    const { id } = req.params;

    try {
      const productVendor = await ProductVendor.findOne({
        where: { id },
        include: [
          {
            model: Product,
            attributes: ['name'],
          },
          {
            model: Vendor,
            attributes: ['name'],
          },
        ],
      });

      if (productVendor) {
        res.json(productVendor);
      } else {
        res.status(404).json({ message: `ProductVendor with id ${id} not found.` });
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { product_id, vendor_id } = req.body;

    try {
      const productVendor = await ProductVendor.findOne({ where: { id } });

      if (productVendor) {
        await sequelize.transaction(async (t) => {
          await productVendor.update({ product_id, vendor_id }, { transaction: t });
        });

        res.json({ message: `ProductVendor with id ${id} updated.` });
      } else {
        res.status(404).json({ message: `ProductVendor with id ${id} not found.` });
      }
    } catch (err) {
      next(err);
    }
  }
 
  static async delete(req, res, next) {
    const { id } = req.params;

    try {
      const productVendor = await ProductVendor.findOne({ where: { id } });

      if (productVendor) {
        await sequelize.transaction(async (t) => {
          await productVendor.destroy({ transaction: t });
        });

        res.json({ message: `ProductVendor with id ${id} deleted.` });
      } else {
        res.status(404).json({ message: `ProductVendor with id ${id} not found.` });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductVendorController;
