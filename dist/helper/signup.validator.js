"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = _joi.default.object().keys({
  username: _joi.default.string().alphanum().min(3).max(30).required(),
  password: _joi.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
}); // joi schema


const validate = (username, password) => _joi.default.validate({
  username,
  password
}, schema, {
  abortEarly: false
});

var _default = validate;
exports.default = _default;