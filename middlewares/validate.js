const validateFilds = (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome) return res.status(401).json({ message: 'nome é obrigatório.' });
  if (!email) return res.status(401).json({ message: 'email é obrigatório.' });
  if (!senha) return res.status(401).json({ message: 'senha é obrigatório.' });

  next();
};

module.exports = { validateFilds };
