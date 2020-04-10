const Joi = require("joi");

const dodajGlumcaSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  rating: Joi.number().required(),
  movies: Joi.array().items(Joi.string()).required(),
  awards: Joi.string().required(),
});

const izmeniGlumcaSchema = {
  name: Joi.string(),
  age: Joi.number(),
  rating: Joi.number(),
  movies: Joi.array().items(Joi.string()),
  awards: Joi.string(),
};

module.exports = { dodajGlumcaSchema, izmeniGlumcaSchema };
