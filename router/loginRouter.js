const { Router } = require('express');
const { userAuthentication } = require('../middlewares/login');
const { login } = require('../controller/userController');

const loginRouter = Router();

loginRouter.post('/', userAuthentication, login);

module.exports = { loginRouter };
