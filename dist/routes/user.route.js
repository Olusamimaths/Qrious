import express from 'express'; // import the controllers

import ask from '../controllers/ask.controller';
import signIn from '../controllers/signin.controller';
import signUp from '../controllers/signup.controller';
import reply from '../controllers/reply.controller';
import getQuestions from '../controllers/allQuestions.controller';
import checkAuth from '../middleware/auth';
var router = express();
router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/ask', ask);
router.post('/reply/:questionId', checkAuth, reply);
router.get('/questions', checkAuth, getQuestions);
export default router;