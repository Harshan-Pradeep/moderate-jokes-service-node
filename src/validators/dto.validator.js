const Joi = require('joi');

const createTypeSchema = Joi.object({
  name: Joi.string().required()
});

const updateJokeSchema = Joi.object({
  content: Joi.string().min(5),
  type: Joi.string(),
  status: Joi.string().valid('pending', 'approved', 'rejected'),
  author: Joi.string()
});

module.exports = {
  createTypeSchema,
  updateJokeSchema
};