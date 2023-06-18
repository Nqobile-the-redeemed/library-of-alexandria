const express = require('express');
const router = express.Router();

const bookLogController = require('../controllers/bookLogController');

// Define routes
router.get('/', bookLogController.getLogs);
router.post('/', bookLogController.createLog);
// other routes...

module.exports = router;
