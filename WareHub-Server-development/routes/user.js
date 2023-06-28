const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.get('/', UserController.getProfile);
router.put('/', UserController.putProfile);

module.exports = router;