import "core-js/modules/es6.array.index-of";
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'; // importing routes

import indexRoute from './routes/index.route';
import userRoute from './routes/user.route';
dotenv.config(); // initialize the app

var app = express();
var whitelist = ['https://olusamimaths.github.io/'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}; // Then pass them to cors:

app.use(cors(corsOptions)); // setup body parser

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // mount the routes

app.use('/api/v1/', indexRoute);
app.use('/api/v1/', userRoute); // handling errors
// create error

app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
}); // send the error

app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
app.use(function (req, res, next) {
  res.locals.user = res.user;
  next();
});
export default app;