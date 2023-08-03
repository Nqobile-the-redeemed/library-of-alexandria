const express = require('express');
const router = express.Router();

const copiesController = require('../controllers/copiesController');

// Define routes
router.post('/', copiesController.saveCopy);
router.put('/:_id', copiesController.editCopyById);
router.delete('/:_id', copiesController.deleteCopyById);
// other routes...

module.exports = router;
