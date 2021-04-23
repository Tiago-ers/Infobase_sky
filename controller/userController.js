const User = require('../model/user');
const moment = require('moment');
const createToken = require('../authorization/createToken');

//Salva usuário
const register = async (req, res) => {
  try {
    const { nome, email } = req.body;
    console.log('Email', email);

    const emailExist = await User.findOne({ email });
    console.log('Existe', emailExist);
    //Verifica se o usuário já está cadastrado
    if (emailExist)
      return res.status(409).json({ message: 'E-mail já existente' });

    //Salva o usuário
    const user = await User.create(req.body);

    //Obten a chave
    const { _id } = user;

    //Cria token JWT
    const token = await createToken({ _id, nome, email });

    //Atualiza o usuário cadastrado com o token
    const userCreated = await User.findByIdAndUpdate(
      { _id },
      { $set: { token } },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json(userCreated);
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Não foi possível cadastrar usuário.', error });
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const userLogin = await User.findOneAndUpdate(
      { email },
      { $set: { ultimo_login: moment().format('DD/MM/YYYY hh-mm-ss') } },
      { new: true, useFindAndModify: false }
    );
    return res.status(201).json(userLogin);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const find = async (req, res) => {
  const authHeader = req.headers.authorization;
  const user = await User.findOne({ token: authHeader }).select({
    _id: 1,
    '+nome': 1,
    '+email': 1,
    '+telefones': 1,
    token: 1,
    data_criacao: 1,
    data_atualizacao: 1,
    ultimo_login: 1,
  });
  return res.status(201).json(user);
};

module.exports = { register, login, find };
