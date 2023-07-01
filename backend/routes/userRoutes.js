const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Define routes
router.get('/', userController.getUsers);
router.post('/', userController.saveUser);
// other routes...

module.exports = router;
