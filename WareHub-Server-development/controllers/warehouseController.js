const { Warehouse, Product } = require('../models');
const ownedData = require('../middlewares/dataHandler');


class WarehouseController {

  static create = async (req, res, next) => {
    const { name, city, address } = req.body;
    try {
      const data = await Warehouse.create({
        user_id: req.user.id,
        name,
        city,
        address
      });
      res.status(200).json(data);
      
    } catch (err) {
     next(err);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const data = await Warehouse.findAll({
        where: {
          user_id: req.user.id
        },
        include: [
          {
            model:Product
          }
        ]
      });
      res.status(200).json(data);
    } catch (err) {
     next(err);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const data = await ownedData(Warehouse, req.params.id, req.user.id);
      res.status(200).json(data);
    } catch (err) { 
      next(err);
    }
  };

  static update = async (req, res, next) => {
    const { name, city, address } = req.body;
    try {
      const data = await ownedData(Warehouse, req.params.id, req.user.id);
      const [numOfRowsAffected, [updatedData]] = await Warehouse.update(
        {
          name: name,
          city: city,
          address: address
        },
        {
          where: { id: data.id, }
          ,returning: true, 
        }
      );
      res.status(200).json({ 
        previous: 
          { 
            name: data.name,
            city: data.city,
            address: data.address
          },
        current: updatedData,
        dataUpdated: numOfRowsAffected
      });
      
    } catch (err) {
     next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const warehouse = await ownedData(Warehouse, req.params.id, req.user.id);
      await Warehouse.destroy({where: {id: req.params.id,}});
      res.status(200).json(
        {message: `${warehouse.name} deleted`}
      );
      
    } catch (err) {
     next(err);
    }
  };
}

module.exports = WarehouseController;
