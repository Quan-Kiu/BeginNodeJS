const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const checkToken = require('../middlewares/checkToken');

router.get('/', checkToken, UserController.index);

module.exports = router;
