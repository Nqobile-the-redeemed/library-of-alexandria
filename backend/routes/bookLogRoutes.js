const express = require('express');
const router = express.Router();

const bookLogController = require('../controllers/bookLogController');

// Define routes
router.get('/', bookLogController.getLogs);
router.post('/', bookLogController.createLog);
router.delete('/:_id', bookLogController.deleteLog);
router.put('/:_id', bookLogController.editLog);
// other routes...

module.exports = router;
