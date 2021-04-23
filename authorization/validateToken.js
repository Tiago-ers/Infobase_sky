const jwt = require('jsonwebtoken');
const secret = require('./secret');

const validateToken = async (token) => {
  const key = await jwt.verify(token, secret);
  return key;
};

module.exports = validateToken;
