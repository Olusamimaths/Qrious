import express from 'express';
import indexRoute from './routes/index';
import signupRoute from './routes/signup';
import signinRoute from './routes/signin';

const app = express();

app.use('/', indexRoute);
app.use('/', signupRoute);
app.use('/', signinRoute);

export default app;
