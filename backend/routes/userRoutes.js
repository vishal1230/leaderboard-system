const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/:id/claim', userController.claimPoints);
router.get('/:id', userController.getUserById);

module.exports = router;
