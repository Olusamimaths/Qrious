import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  // password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  password: Joi.string().required(),
});
// joi schema
const validate = (username, password) => Joi.validate(
    { username, password }, schema, {abortEarly: false}
  );

export default validate;