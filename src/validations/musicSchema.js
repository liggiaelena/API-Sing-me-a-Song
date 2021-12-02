import Joi from 'joi';

const musicValidation = Joi.object({
  name: Joi.string().min(3).required(),
  youtubeLink: Joi.string().required(),
});

export{
    musicValidation,
}