const Joi = require('joi');

const name = Joi.string();
const email = Joi.string();
const password = Joi.string();
const roles = Joi.string();

const singIn = Joi.object({
  email: email.required(),
  password: password.required(),
});

const singUp = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  roles,
});

module.exports = {singIn, singUp};