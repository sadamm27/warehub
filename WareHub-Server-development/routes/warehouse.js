const express = require('express');
const router = express.Router();
const WarehouseController = require('../controllers/warehouseController');

router.post('/create', WarehouseController.create);
router.get('/', WarehouseController.getAll);
router.get('/:id', WarehouseController.getById);
router.put('/:id', WarehouseController.update);
router.delete('/:id', WarehouseController.delete);

module.exports = router;
