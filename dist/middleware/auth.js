import "core-js/modules/es6.regexp.split";
import jwt from 'jsonwebtoken';

var checkAuth = function checkAuth(req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'Authentication Failed'
    });
  }
};

export default checkAuth;