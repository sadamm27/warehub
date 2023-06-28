const { Product, Warehouse, WarehouseStock, sequelize } = require('../models');
const ownedData = require('../middlewares/dataHandler')


class WarehouseStockController {

  static moveProduct = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { product_id, quantity, source_warehouse_id, destination_warehouse_id } = req.body;
  
      // check if the source warehouse and destination are valid
      const sourceWarehouse = await ownedData(Warehouse, source_warehouse_id, req.user.id);
      const destinationWarehouse = await ownedData(Warehouse, destination_warehouse_id, req.user.id);
  
      // check products stock enough to be moved from the source warehouse
      const sourceStock = await WarehouseStock.findOne({
        where: { warehouse_id: sourceWarehouse.id, product_id: product_id },
        transaction: t
      });
      if (!sourceStock || sourceStock.quantity < quantity) {
        throw { name: "insufficient" };
      }
  
      // update source & destination quantity
      await sourceStock.decrement('quantity', { by: quantity, transaction: t });
      let destinationStock = await WarehouseStock.findOne({
        where: { warehouse_id: destinationWarehouse.id, product_id: product_id },
        transaction: t
      });
      if (!destinationStock) {
        destinationStock = await WarehouseStock.create({
          warehouse_id: destinationWarehouse.id,
          product_id: product_id,
          quantity: quantity
        }, { transaction: t });
      } else {
        await destinationStock.increment('quantity', { by: quantity, transaction: t });
      }
  
      await t.commit();
      res.status(200).json({ message: 'Product moved successfully' });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  
  static getAll = async (req, res, next) => {
    try {
      // Get warehouses for the current user
      const warehouses = await Warehouse.findAll({
        where: { user_id: req.user.id }
      });
  
      // Get warehouseStocks for the warehouses belonging to the user
      const warehouseStocks = await WarehouseStock.findAll({
        where: { warehouse_id: warehouses.map(warehouse => warehouse.id) }
      });
  
      if (warehouseStocks) {
        res.status(200).json(warehouseStocks);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (err) {
      next(err);
    }
  };
  
  static async getById(req, res, next) {
    const { id } = req.params;
  
    try {
      const warehouseStock = await WarehouseStock.findOne({
        include: {
          model: Warehouse,
          where: { user_id: req.user.id }
        },
        where: { id }
      });
  
      if (!warehouseStock) {
        throw { name: 'ErrorNotFound' };
      }
  
      res.status(200).json(warehouseStock);
    } catch (err) {
      next(err);
    }
  }
  
  static update = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { product_id, warehouse_id, quantity } = req.body;
  
      // find the warehouse stock to be updated
      const warehouseStock = await WarehouseStock.findOne({ where: { id: id }, transaction: t });
  
      // if warehouse stock not found, throw error
      if (!warehouseStock) {
        throw { name: 'ErrorNotFound' };
      }
  
      // check if the warehouse stock belongs to the current user
      const warehouse = await Warehouse.findOne({ where: { id: warehouseStock.warehouse_id }, transaction: t });
      if (!warehouse || warehouse.user_id !== req.user.id) {
        throw { name: 'UnauthorizedError' };
      }
  
      // update the warehouse stock
      if (warehouse.user_id === req.user.id) {
          await warehouseStock.update({ product_id, warehouse_id, quantity }, { transaction: t });
      } else {
        throw { name: 'Unauthorized' };
      }

  
      // commit transaction and send response
      await t.commit();
      res.status(200).json({ message: 'Warehouse stock updated successfully' });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      await WarehouseStock.destroy({where: {id: req.params.id,}});
      res.status(200).json(
        {message: `stocks deleted`}
      );
      
    } catch (err) {
     next(err);
    }
  };
}

module.exports = WarehouseStockController;
