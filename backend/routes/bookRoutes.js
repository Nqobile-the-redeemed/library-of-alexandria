const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

// Define routes
router.get('/', bookController.getAllBooks);
router.post('/', bookController.saveBook);
router.post('/upload', bookController.uploadImage);
router.put('/:_id', bookController.editBookById);
// other routes...

module.exports = router;
