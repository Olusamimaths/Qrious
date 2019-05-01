import express from 'express';
import signUp from '../controllers/signup';

const router = express();

router.post('/signup', signUp);

export default router;
