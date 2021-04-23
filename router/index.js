const { loginRouter } = require('./loginRouter');
const { registerRouter } = require('./registerRouter');
const { findUser } = require('./findUsers');

module.exports = {
  findUser,
  loginRouter,
  registerRouter,
};
