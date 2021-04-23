const validateToken = require('../authorization/validateToken');
const jwt_decode = require('jwt-decode');
const User = require('../model/user');

const auth = async (req, res, next) => {
  ////Valida se o token existe
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Não autorizado' });

  //Obtendo o id do usuário
  const { _id } = jwt_decode(authHeader);
  // console.log(req.body);

  //Obtendo o token do usuário cadastrado no banco
  const tokenUser = await User.findById({ _id });
  // console.log('token user', tokenUser.token);

  //Comparando o token do banco com o req.headers.authorization
  if (authHeader != tokenUser.token)
    return res.status(401).json({ message: 'Não autorizado' });

  // //Valida se o token expirou
  try {
    const data = await validateToken(authHeader);
    // console.log('Validade', data);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Sessão inválida' });
  }
};

module.exports = { auth };
