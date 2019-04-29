"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index"));

var _signup = _interopRequireDefault(require("./routes/signup"));

var _signin = _interopRequireDefault(require("./routes/signin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use('/', _index["default"]);
app.use('/', _signup["default"]);
app.use('/', _signin["default"]);
var _default = app;
exports["default"] = _default;