"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 5000;

var server = _http["default"].createServer(_app["default"]);

server.listen(port, function () {
  return console.log("App started on this port: ".concat(port));
});
module.exports = server;