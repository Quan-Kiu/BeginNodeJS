const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const checkToken = require('../middlewares/checkToken');

router.route('/login').get(AuthController.login).post(AuthController.loginUser);
router
    .route('/register')
    .get(AuthController.register)
    .post(AuthController.createUser);

module.exports = router;
