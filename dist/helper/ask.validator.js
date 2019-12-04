"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = _joi["default"].object().keys({
  question: _joi["default"].string().min(5).max(250).required(),
  meantFor: _joi["default"].string().alphanum().min(3).max(30).required()
});

var validate = function validate(question, meantFor) {
  return _joi["default"].validate({
    question: question,
    meantFor: meantFor
  }, schema, {
    abortEarly: false
  });
};

var _default = validate;
exports["default"] = _default;