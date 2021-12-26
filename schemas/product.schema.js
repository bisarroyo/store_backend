const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const description = Joi.string().min(3).max(255);
const price = Joi.number().min(0);
const qty = Joi.number().min(0);
const image = Joi.string().uri();

const crateProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  qty: qty.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  qty: qty,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { crateProductSchema, updateProductSchema, getProductSchema };
