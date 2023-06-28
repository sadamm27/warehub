const express = require('express');
const router = express.Router();
const RevenueController = require('../controllers/revenueController');

router.post('/create', RevenueController.create);
router.get('/', RevenueController.getAll);
router.get('/:id', RevenueController.getById);
router.put('/:id', RevenueController.update);
router.delete('/:id', RevenueController.delete);

module.exports = router;
