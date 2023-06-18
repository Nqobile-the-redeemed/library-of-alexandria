const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Define routes
router.get('/', userController.getusers);
router.post('/', userController.createuser);
// other routes...

module.exports = router;
