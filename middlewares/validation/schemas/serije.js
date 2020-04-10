const Joi = require("joi");

const dodajSerijuSchema = Joi.object({
  name: Joi.string().required(),
  plot: Joi.string().required(),
  episodes: Joi.number().required(),
});

const izmeniSerijuSchema = {
  name: Joi.string(),
  plot: Joi.string(),
  episodes: Joi.number(),
};

module.exports = { dodajSerijuSchema, izmeniSerijuSchema };
