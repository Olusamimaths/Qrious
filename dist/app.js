"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./routes/index.route"));

var _user = _interopRequireDefault(require("./routes/user.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing routes
_dotenv.default.config(); // initialize the app


const app = (0, _express.default)();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://olusamimaths.github.io");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials");
  next();
}); // setup body parser

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json()); // mount the routes

app.use('/api/v1/', _index.default);
app.use('/api/v1/', _user.default); // handling errors
// create error

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
}); // send the error

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
app.use((req, res, next) => {
  res.locals.user = res.user;
  next();
});
module.exports = app;