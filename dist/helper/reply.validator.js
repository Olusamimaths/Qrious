import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.to-string";
import Joi from 'joi';
var schema = Joi.object().keys({
  answer: Joi.string().min(5).required()
});

var validate = function validate(answer) {
  return Joi.validate({
    answer: answer
  }, schema, {
    abortEarly: false
  });
};

export default validate;