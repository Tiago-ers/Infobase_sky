const { Router } = require('express');
const { auth } = require('../middlewares/auth');
const { find } = require('../controller/userController');

const findUser = Router();

findUser.get('/', auth, find);

module.exports = { findUser };
