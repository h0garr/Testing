const Joi = require("joi");

const dodajFilmSchema = Joi.object({
  title: Joi.string().required(),
  plot: Joi.string().required(),
  year: Joi.number().required(),
  rating: Joi.number().required(),
});

const izmeniFilmSchema = Joi.object({
  title: Joi.string(),
  plot: Joi.string(),
  year: Joi.number(),
  rating: Joi.number(),
});

module.exports = { dodajFilmSchema, izmeniFilmSchema };
