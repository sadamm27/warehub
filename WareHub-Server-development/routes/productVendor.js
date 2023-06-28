const express = require('express');
const router = express.Router();
const ProductVendorController = require('../controllers/productVendorController');

router.post('/create', ProductVendorController.create);
router.get('/', ProductVendorController.getAll)
router.get('/:id', ProductVendorController.getById)
router.put('/:id', ProductVendorController.update);
router.delete('/:id', ProductVendorController.delete);

module.exports = router;
