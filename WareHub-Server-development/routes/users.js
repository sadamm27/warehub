const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete)

module.exports = router;