import express from 'express';
import signIn from '../controllers/signin';

const router = express();

router.post('/signin', signIn);

export default router;
