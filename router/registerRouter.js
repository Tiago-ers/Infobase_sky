const { Router } = require('express');
const { register } = require('../controller/userController');

const registerRouter = Router();

registerRouter.post('/', register);

module.exports = { registerRouter };
