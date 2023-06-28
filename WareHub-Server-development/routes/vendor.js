const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendorController');

router.post('/create', VendorController.create);
router.get('/', VendorController.getAll);
router.get('/:id', VendorController.getById);
router.put('/:id', VendorController.update);
router.delete('/:id', VendorController.delete);

module.exports = router;
