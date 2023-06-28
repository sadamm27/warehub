const { Revenue, User } = require('../models');
const ownedData = require('../middlewares/dataHandler');

class RevenueController {

  static async create(req, res, next) {
    const {revenue, detail } = req.body;
    try {
      const data = await Revenue.create({ user_id: req.user.id, revenue, detail });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      let totalRevenue = 0;
      const data = await Revenue.findAll({
        where: {
          user_id: req.user.id
        }
      });
      for(let i = 0; i < data.length; i++) {
        totalRevenue += data[i].revenue;
      }
      res.status(200).json({
        revenues: data,
        totalRevenue
      });
    } catch (err) {
      next(err);
    }
  }

  static getById = async (req, res, next) => {
    try {
      const data = await ownedData(Revenue, req.params.id, req.user.id);
      res.status(200).json(data);
    } catch (err) { 
      next(err);
    }
  };
  
  static async update(req, res, next) {
    const { revenue, detail } = req.body;
    try {
      const data = await ownedData(Revenue, req.params.id, req.user.id);
      const [numOfRowsAffected, [updatedData]] = await Revenue.update(
        { 
          user_id: req.user.id, 
          revenue: revenue, 
          detail: detail 
        },
        { where: 
          { id: data.id }, 
          returning: true }
      );
      res.status(200).json({ 
        previous: 
          { 
            revenue: data.revenue, 
            detail: data.detail 
          },
        current: updatedData,
        dataUpdated: numOfRowsAffected
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const revenue = await ownedData(Revenue, req.params.id, req.user.id)
      await Revenue.destroy({ where: {id: req.params.id} });
      res.status(200).json({message: `${revenue.detail} deleted`});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RevenueController;
