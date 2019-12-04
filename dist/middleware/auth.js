"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_KEY);

    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'Authentication Failed'
    });
  }
};

var _default = checkAuth;
exports.default = _default;