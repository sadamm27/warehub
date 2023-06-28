const { Vendor } = require('../models');
const ownedData = require('../middlewares/dataHandler');


class VendorController {

  static create = async (req, res, next) => {
    const { name, country } = req.body;
    try {
      const data = await Vendor.create({
        user_id: req.user.id,
        name,
        country
      });
      res.status(200).json(data);
      
    } catch (err) {
     next(err);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const data = await Vendor.findAll({
        where: {
          user_id: req.user.id
        }
      });
      res.status(200).json(data);
    } catch (err) {
     next(err);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const vendorId = req.params.id;
      const userId = req.user.id;
  
      const vendor = await ownedData(Vendor, vendorId, userId);
      const products = await vendor.getProducts(); // Retrieve associated products
  
      const uniqueProducts = [...new Map(products.map(product => [product.id, product])).values()];
  
      const data = {
        vendor: vendor,
        products: uniqueProducts
      };
  
      res.status(200).json(data);
    } catch (err) { 
      next(err);
    }
  };
  

  static update = async (req, res, next) => {
    const { name, country } = req.body;
    try {
      const data = await ownedData(Vendor, req.params.id, req.user.id);
      const [numOfRowsAffected, [updatedData]] = await Vendor.update(
        {
          name: name,
          country: country
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
            country: data.country
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
      const vendor = await ownedData(Vendor, req.params.id, req.user.id);
      await Vendor.destroy({where: {id: req.params.id,}});
      res.status(200).json(
        {message: `${vendor.name} deleted`}
      );
      
    } catch (err) {
     next(err);
    }
  };
}

module.exports = VendorController;
