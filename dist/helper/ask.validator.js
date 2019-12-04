import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.to-string";
import Joi from 'joi';
var schema = Joi.object().keys({
  question: Joi.string().min(5).max(250).required(),
  meantFor: Joi.string().alphanum().min(3).max(30).required()
});

var validate = function validate(question, meantFor) {
  return Joi.validate({
    question: question,
    meantFor: meantFor
  }, schema, {
    abortEarly: false
  });
};

export default validate;