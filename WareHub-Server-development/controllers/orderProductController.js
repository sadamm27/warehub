const { OrderProduct , Product, User} = require('../models');
const ownedData = require('../middlewares/dataHandler');


class OrderProductController {

  static async create(req, res, next) {
    try {
      const { product_id, order_id, price, quantity } = req.body;
      const orderProduct = await OrderProduct.create({ product_id, order_id, price, quantity });
      res.status(201).json(orderProduct);
    } catch (err) {
      next(err);
      console.log(err)
    }
  }

  static async getAll(req, res, next) {
    try {
        const products = await Product.findAll({
          include: [{
            model: User,
            where: { id: req.user.id }
          }]
        });
    
        const orderProducts = await OrderProduct.findAll({
          where: {
            product_id: products.map(p => p.id)
          }
        });

        res.status(200).json(orderProducts);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const data = await OrderProduct.findOne({
        where: {
          id: req.params.id,
        },
      });
    
      res.status(200).json(data);
      
    } catch (err) {
      next(err);
    }
  }
  
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { product_id, order_id, price, quantity } = req.body;

      const products = await Product.findAll({
        include: [{
          model: User,
          where: { id: req.user.id }
        }]
      });
      
      const orderProduct = await OrderProduct.findOne({
        where: {
          id,
          product_id: products.map(p => p.id)
        }
      });
      if (!orderProduct) {
        throw { message: "ErrorNotFound" };
      }

      const [updatedRowsCount, [updatedOrderProduct]] = await OrderProduct.update(
        { product_id, order_id, price, quantity },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw { message: "ErrorNotFound" };
      }
      res.status(200).json(updatedOrderProduct);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const products = await Product.findAll({
        include: [{
          model: User,
          where: { id: req.user.id }
        }]
      });
  
      const orderProducts = await OrderProduct.findAll({
        where: {
          product_id: products.map(p => p.id)
        }
      });

      const deletedRowsCount = await OrderProduct.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw { message: "ErrorNotFound" };
      }
      res.status(200).json({ message: `Deleted successfully` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderProductController;
