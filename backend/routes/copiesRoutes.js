const express = require('express');
const router = express.Router();

const copiesController = require('../controllers/copiesController');

// Define routes
router.get('/', copiesController.getCopy);
router.post('/', copiesController.createCopy);
// other routes...

module.exports = router;
