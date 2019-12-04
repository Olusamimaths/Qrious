import express from 'express';

const router = express();

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'Welcome to Curious Me'});
});

export default router;
