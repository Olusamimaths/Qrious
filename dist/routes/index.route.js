import express from 'express';
var router = express();
router.get('/', function (req, res, next) {
  res.status(200).json({
    message: 'Welcome to Curious Me'
  });
});
export default router;