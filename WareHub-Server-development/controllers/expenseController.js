const { Expense } = require('../models');
const ownedData = require('../middlewares/dataHandler');

class ExpenseController {

  static async create(req, res, next) {
    try {
      const { expense, detail, vendor_id } = req.body;
      const expenseItem = await Expense.create(
        { user_id: req.user.id,
          expense, 
          detail, 
          vendor_id 
        }
      );
      res.status(201).json(expenseItem);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      let totalExpense = 0;
      const data = await Expense.findAll(
        {
          where: {
            user_id: req.user.id
          }
        }
      );
      
      for(let i = 0; i < data.length; i++) {
        totalExpense += data[i].expense
      }

      res.status(200).json({
        expenses: data,
        totalExpense
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const data = await ownedData(Expense, req.params.id, req.user.id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const { expense, detail } = req.body;
    try {
      const data = await ownedData(Expense, req.params.id, req.user.id);
      const [numOfRowsAffected, [updatedData]] = await Expense.update(
        { 
          user_id: req.user.id, 
          expense: expense, 
          detail: detail 
        },
        { where: 
          { id: data.id }, 
          returning: true }
      );
      res.status(200).json({ 
        previous: 
          { 
            expense: data.expense, 
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
      const expense = await ownedData(Expense, req.params.id, req.user.id)
      await Expense.destroy({ where: {id: req.params.id} });
      res.status(200).json({message: `${expense.detail} deleted`});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ExpenseController;
