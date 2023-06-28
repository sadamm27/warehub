const { Order, Customer, User, OrderProduct, Product, sequelize, Revenue, WarehouseStock, Warehouse } = require('../models');
const ownedData = require('../middlewares/dataHandler');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 1;

class OrderController {

  static async create(req, res, next) {
    const { name, customer_id, warehouse_id,order_products } = req.body;
  
    const t = await sequelize.transaction();
  
    try {
      const createdOrder = await Order.create(
        { name, customer_id, warehouse_id, user_id: req.user.id },
        { transaction: t }
      );
  
      let orderProductArray = [];
      let totalPrice = 0;
  
      for (let i = 0; i < order_products.length; i++) {
        const currentProduct = order_products[i];
  
        const product = await Product.findByPk(currentProduct.product_id, { transaction: t });
  
        
  
        const warehouseStock = await WarehouseStock.findOne({
          where: {
            product_id: currentProduct.product_id,
            warehouse_id,
          },
          transaction: t,
        });
  
        if (!warehouseStock) {
          throw {name: "emptyStock"};
        }
  
        if (warehouseStock.quantity < currentProduct.quantity) {

          throw {name: "insufficient"};
        }
  
        const updatedQuantity = warehouseStock.quantity - currentProduct.quantity;
        await warehouseStock.update({ quantity: updatedQuantity }, { transaction: t });
  
        const createdOP = await OrderProduct.create(
          {
            product_id: currentProduct.product_id,
            order_id: createdOrder.id,
            price: currentProduct.price,
            quantity: currentProduct.quantity,
          },
          { transaction: t }
        );
  
        totalPrice += currentProduct.price * currentProduct.quantity;
        orderProductArray.push(createdOP);
      }
  
      await createdOrder.update({ total_price: totalPrice }, { transaction: t });
  
      await Revenue.create(
        {
          user_id: req.user.id,
          revenue: totalPrice,
          detail: `revenue from order detail ${createdOrder.id}`,
        },
        { transaction: t }
      );
  
      await t.commit();
  
      res.status(201).json({ ...(createdOrder.dataValues), order_products: orderProductArray });

    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  
  static async getAll(req, res, next) {
    try {
      const { page,limit } = req.query;
      const { count, rows: data } = await Order.findAndCountAll(filtering(req.query, req.user.id));
      const currentPage = page ? +page : DEFAULT_PAGE;
      const totalPages = limit ? Math.ceil(count / limit) : Math.ceil(count / DEFAULT_LIMIT);
      const result = {
        totalData: count,
        data,
        totalPages,
        currentPage
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  
  static getById = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const userId = req.user.id;
  
      const order = await ownedData(Order, orderId, userId);
      const products = await order.getProducts();
      const warehouses = await order.getWarehouse();
      const customers = await order.getCustomer();
      const details = await order.getOrderProducts();
  
      const data = {
        order: order,
        products: products,
        warehouse: warehouses,
        customer: customers,
        details: details
      };
  
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  

  static update = async (req, res, next) => {
    const { customer_id, name, warehouse_id, order_products } = req.body;
    const t = await sequelize.transaction();
  
    try {
      const data = await ownedData(Order, req.params.id, req.user.id);
      await Order.update(
        {
          user_id: req.user.id,
          customer_id: customer_id,
          name: name,
          warehouse_id: warehouse_id,
        },
        {
          where: {
            id: data.id,
          },
          transaction: t,
        }
      );
  
      let orderProductArray = [];
      let totalPrice = 0;
  
      for (let i = 0; i < order_products.length; i++) {
        const currentProduct = order_products[i];
  
        const product = await Product.findByPk(currentProduct.product_id, { transaction: t });
  
        if (!product || product.price !== currentProduct.price) {
          throw { name: "productPriceError" };
        }
  
        const warehouseStock = await WarehouseStock.findOne({
          where: {
            product_id: currentProduct.product_id,
            warehouse_id: warehouse_id,
          },
          transaction: t,
        });
  
        if (!warehouseStock) {
          throw { name: "emptyStock" };
        }
  
        if (warehouseStock.quantity < currentProduct.quantity) {
          throw { name: "insufficient" };
        }
  
        const updatedQuantity = warehouseStock.quantity - currentProduct.quantity;
        await warehouseStock.update({ quantity: updatedQuantity }, { transaction: t });
  
        const updatedOP = await OrderProduct.update(
          {
            price: currentProduct.price,
            quantity: currentProduct.quantity,
          },
          {
            where: {
              product_id: currentProduct.product_id,
              order_id: data.id,
            },
            returning: true,
            transaction: t,
          }
        );
  
        totalPrice += currentProduct.price * currentProduct.quantity;
        orderProductArray.push(updatedOP[1][0]);
      }
  
      await Order.update(
        {
          total_price: totalPrice,
        },
        {
          where: {
            id: data.id,
          },
          transaction: t,
        }
      );
  
      const revenueEntry = await Revenue.findOne({
        where: {
          detail: `revenue from order detail ${data.id}`,
        },
        transaction: t,
      });
      
      if (revenueEntry) {
        const previousRevenue = revenueEntry.revenue;
        revenueEntry.revenue = totalPrice;
        await revenueEntry.save({ transaction: t });
      } else {
        await Revenue.create(
          {
            user_id: req.user.id,
            revenue: totalPrice,
            detail: `revenue from order detail ${data.id}`,
          },
          { transaction: t }
        );
      }
      
  
      await t.commit();
  
      const updatedData = await Order.findByPk(data.id, {
        include: [
          {
            model: OrderProduct,
            attributes: ["product_id", "price", "quantity"],
          },
        ],
      });
  
      res.status(200).json({
        previous: {
          customer_id: data.customer_id,
          name: data.name,
          warehouse_id: data.warehouse_id,
          total_price: data.total_price,
        },
        current: {
          ...(updatedData.dataValues),
          order_products: orderProductArray,
        },
        dataUpdated: 1,
      });

    } catch (err) {
      await t.rollback();
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const order = await ownedData(Order, req.params.id, req.user.id);
      await Order.destroy({where: {id: req.params.id,}});
      res.status(200).json(
        {message: `${order.name} deleted`}
      );
      
    } catch (err) {
     next(err);
    }
  };
}

function filtering(query, user) {
  const { customer_id, warehouse_id, page = 1, limit = 10, sort } = query;
  const offset = (page - 1) * limit;


  let joinCustomer = {
    model: Customer
  }
  if (customer_id) {
    joinCustomer.where = {
      customer_id
    }
  }
  const joinBuild = [
    { model: Customer, 
      where: customer_id ? { id: +customer_id } : {}, 
      required: customer_id ? true : false },
    { 
      model: Warehouse, 
      where: warehouse_id ? { id: +warehouse_id } : {}, 
      required: warehouse_id ? true : false 
    },    
  ];

  const filter = {
    include: joinBuild,
    where: { user_id: user },
    exclude: [User],
    limit: parseInt(limit),
    offset: parseInt(offset),
    distinct: true,
    order: sort ? [[sort.split(':')[0], sort.split(':')[1] || 'ASC']] : []
  };

  return filter;
}

module.exports = OrderController;
