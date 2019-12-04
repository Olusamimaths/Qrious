"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 5000;

const server = _http.default.createServer(_app.default);

server.listen(port, () => console.log(`App started on this port: ${port}`));
module.exports = server;