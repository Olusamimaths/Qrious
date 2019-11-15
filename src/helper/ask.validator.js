import Joi from 'joi';

const schema = Joi.object().keys({
  question: Joi.string().min(5).max(250).required(),
  meantFor: Joi.string().alphanum().min(3).max(30)
.required(),
});

const validate = (question, meantFor) => Joi.validate({ question, meantFor }, schema, { abortEarly: false });

export default validate;
