"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _ask = _interopRequireDefault(require("../controllers/ask.controller"));

var _signin = _interopRequireDefault(require("../controllers/signin.controller"));

var _signup = _interopRequireDefault(require("../controllers/signup.controller"));

var _reply = _interopRequireDefault(require("../controllers/reply.controller"));

var _allQuestions = _interopRequireDefault(require("../controllers/allQuestions.controller"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import the controllers
const router = (0, _express.default)();
router.post('/signin', _signin.default);
router.post('/signup', _signup.default);
router.post('/ask', _ask.default);
router.post('/reply/:questionId', _auth.default, _reply.default);
router.get('/questions', _auth.default, _allQuestions.default);
var _default = router;
exports.default = _default;