"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = _joi.default.object().keys({
  question: _joi.default.string().min(5).max(250).required(),
  meantFor: _joi.default.string().alphanum().min(3).max(30).required()
});

const validate = (question, meantFor) => _joi.default.validate({
  question,
  meantFor
}, schema, {
  abortEarly: false
});

var _default = validate;
exports.default = _default;