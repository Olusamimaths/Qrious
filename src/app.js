import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './models/db';

dotenv.config()

// importing routes
import indexRoute from './routes/index';
import signupRoute from './routes/signup';
import signinRoute from './routes/signin';

// initialize the app
const app = express();

// setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mount the routes
app.use('/api/v1/', indexRoute);
app.use('/api/v1/', signupRoute);
app.use('/api/v1/', signinRoute);

// handling errors
// create error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
// send the error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use((req, res, next) => {
  res.locals.user = res.user;
  next();
});

export default app;
