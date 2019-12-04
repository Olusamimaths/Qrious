"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = _joi["default"].object().keys({
  answer: _joi["default"].string().min(5).required()
});

var validate = function validate(answer) {
  return _joi["default"].validate({
    answer: answer
  }, schema, {
    abortEarly: false
  });
};

var _default = validate;
exports["default"] = _default;