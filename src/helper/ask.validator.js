import Joi from 'joi';

const schema = Joi.object().keys({
    question: Joi.string().min(5).max(250).required(),
    placedBy: Joi.string().alphanum().min(3).required(),
    meantFor: Joi.string().alphanum().min(3).max(30).required()
})

const validate = (question, placedBy, meantFor) => Joi.validate({ question, placedBy, meantFor }, schema, { abortEarly: false });

export default validate;