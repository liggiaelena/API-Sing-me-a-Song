import Joi from 'joi';

const musicValidation = Joi.object({
  name: Joi.string().min(3).required(),
  youtubeLink: Joi.string().required(),
});

const amountValidation = Joi.number().positive().required();

export {
  musicValidation,
  amountValidation,
};
