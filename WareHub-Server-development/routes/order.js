const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.post('/create', OrderController.create);
router.get('/', OrderController.getAll);
router.get('/:id', OrderController.getById);
router.put('/:id', OrderController.update);
router.delete('/:id', OrderController.delete);

module.exports = router;
