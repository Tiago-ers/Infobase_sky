const { Router } = require('express');
const { validateFilds } = require('../middlewares/validate');
const { register } = require('../controller/userController');

const registerRouter = Router();

registerRouter.post('/', validateFilds, register);

module.exports = { registerRouter };
