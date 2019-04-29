import express from 'express';

const router = express();

router.get('/signup', (req, res, next) => {
    res.status(200).json({message: 'Please sign up'});
});

export default router;
