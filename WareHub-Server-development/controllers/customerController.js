const { Customer } = require("../models/");
const ownedData = require('../middlewares/dataHandler');


class CustomerController {

  static create = async (req, res, next) => {
    const { first_name, last_name, email, address, company } = req.body;
    try {
      const data = await Customer.create({
        user_id: req.user.id,
        first_name,
        last_name,
        email,
        address,
        company,
      });
      res.status(200).json(data);
      
    } catch (err) {
     next(err);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const data = await Customer.findAll({
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
      const data = await ownedData(Customer, req.params.id, req.user.id);
      res.status(200).json(data);
    } catch (err) { 
      next(err);
    }
  };
    
  static update = async (req, res, next) => {
    const { first_name, last_name, email, address, company } = req.body;
    try {
      const data = await ownedData(Customer, req.params.id, req.user.id);
      const [numOfRowsAffected, [updatedData]] = await Customer.update(
        {
          user_id: req.user.id,
          first_name: first_name,
          last_name: last_name,
          email: email,
          address: address,
          company: company,
        },
        {
          where: { id: data.id, }
          ,returning: true, 
        }
      );
      res.status(200).json({ 
        previous: 
          { 
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            address: data.address,
            company: data.company, 
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
      const customer = await ownedData(Customer, req.params.id, req.user.id);
      await Customer.destroy({where: {id: req.params.id,}});
      res.status(200).json(
        {message: `${customer.last_name} deleted`}
      );
      
    } catch (err) {
     next(err);
    }
  };
}

module.exports = CustomerController;
