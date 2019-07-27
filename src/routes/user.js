import express from 'express';

// import the controllers
import ask from '../controllers/ask.controller';
import signIn from '../controllers/signin.controller';
import signUp from '../controllers/signup.controller';
import reply from '../controllers/reply.controller';

const router = express();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/ask', ask);

router.post('/reply/id?=questionId', reply)

export default router;
