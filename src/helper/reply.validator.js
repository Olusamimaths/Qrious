import Joi from 'joi';

const schema = Joi.object().keys({
  answer: Joi.string().min(5).max(250).required(),
});

const validate = answer => Joi.validate({ answer }, schema, { abortEarly: false });

export default validate;
