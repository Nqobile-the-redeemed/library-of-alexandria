const express = require('express');
const router = express.Router();

const copiesController = require('../controllers/copiesController');

// Define routes
router.get('/', copiesController.getCopies);
router.post('/', copiesController.saveCopy);
// other routes...

module.exports = router;
