const express = require('express');
const router = express.Router();
const WarehouseStockController = require('../controllers/warehouseStockController');

router.get('/', WarehouseStockController.getAll);
router.get('/:id', WarehouseStockController.getById);
router.put('/:id', WarehouseStockController.update);
router.delete('/:id', WarehouseStockController.delete);
router.post('/move', WarehouseStockController.moveProduct);

module.exports = router;
