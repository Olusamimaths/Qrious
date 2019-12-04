import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.to-string";
import Joi from 'joi';
var schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
}); // joi schema

var validate = function validate(username, password) {
  return Joi.validate({
    username: username,
    password: password
  }, schema, {
    abortEarly: false
  });
};

export default validate;