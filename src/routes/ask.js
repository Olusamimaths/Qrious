import express from 'express';
import ask from '../controllers/ask';

const router = express();

router.post('/ask', ask);

export default router;
