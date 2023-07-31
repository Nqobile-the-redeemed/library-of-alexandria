const express = require('express');
const router = express.Router();

const copiesController = require('../controllers/copiesController');

// Define routes
router.get('/book/:bookName', copiesController.getCopiesByBookName);
// other routes...

module.exports = router;
