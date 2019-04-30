import express from 'express';

const router = express();

router.get('/signin', (req, res, next) => {
    res.status(200).json({message: 'Please sign in'});
});

export default router;
