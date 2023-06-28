const express = require('express');
const router = express.Router();
const OrderProductController = require('../controllers/orderProductController')

router.post('/create', OrderProductController.create);
router.get('/', OrderProductController.getAll);
router.get('/:id', OrderProductController.getById);
router.put('/:id', OrderProductController.update);
router.delete('/:id', OrderProductController.delete);

module.exports = router;
