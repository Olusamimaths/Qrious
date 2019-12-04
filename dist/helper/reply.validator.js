"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = _joi.default.object().keys({
  answer: _joi.default.string().min(5).required()
});

const validate = answer => _joi.default.validate({
  answer
}, schema, {
  abortEarly: false
});

var _default = validate;
exports.default = _default;