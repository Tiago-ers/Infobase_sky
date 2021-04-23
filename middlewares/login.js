const User = require('../model/user');
const bcrypt = require('bcryptjs');

const userAuthentication = async (req, res, next) => {
  const { email, senha } = req.body;
  //   console.log('Autentucação', email);

  const userExist = await User.findOne({ email }).select('+senha');
  //   console.log('usere exists', userExist);

  if (!userExist)
    return res.status(401).json({ error: 'Usuário e/ou senha inválidos' });

  //Comparando as senhas
  //Caso não sejam iquais retorna um erro
  if (!(await bcrypt.compare(senha, userExist.senha))) {
    return res.status(401).send({ error: 'Usuário e/ou senha inválidos' });
  }

  return next();
};

module.exports = { userAuthentication };
