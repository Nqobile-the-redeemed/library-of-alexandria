const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

// Define routes
router.get('/', bookController.getAllBooks);
router.post('/', bookController.saveBook);
router.post('/upload', bookController.uploadImage);
router.put('/omega/:_id', bookController.editBookById);
router.put('/:_id', bookController.omegaEditBookById);
router.get('/:bookCover', bookController.getBookCover);
// other routes...

module.exports = router;
