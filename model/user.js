const mongoose = require('../database');
const bcrypt = require('bcryptjs');
const moment = require('moment');

//Mongoose schema
//Modelo que será salvo no mongodb
const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      select: false,
    },
    senha: {
      type: String,
      required: true,
      select: false,
    },
    telefones: {
      type: Array,
      required: true,
      select: false,
    },
    data_criacao: {
      type: String,
      default: moment().format('DD/MM/YYYY hh-mm-ss'),
    },
    data_atualizacao: {
      type: String,
      default: moment().format('DD/MM/YYYY hh-mm-ss'),
    },
    ultimo_login: {
      type: String,
      default: moment().format('DD/MM/YYYY hh-mm-ss'),
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

/**
 * Criptografando a senha
 * A frunção (.pre) realiza a
 * criptografia antes de salvar no banco
 */
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
