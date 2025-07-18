const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.get('/', historyController.getAllHistory);
router.get('/:userId', historyController.getUserHistory);

module.exports = router;
