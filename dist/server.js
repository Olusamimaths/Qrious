import http from 'http';
import app from './app';
var port = process.env.PORT || 5000;
var server = http.createServer(app);
server.listen(port, function () {
  return console.log("App started on this port: ".concat(port));
});
module.exports = server;