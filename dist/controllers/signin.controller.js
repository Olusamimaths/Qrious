"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../models/db"));

var _signup = _interopRequireDefault(require("../helper/signup.validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function signIn(req, res, next) {
  var _req$body, username, password, result, query, hashed, queryResult;

  return regeneratorRuntime.async(function signIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          result = (0, _signup["default"])(username, password);

          if (result.error) {
            _context.next = 20;
            break;
          }

          query = "SELECT * FROM users WHERE username = '".concat(username, "';");
          hashed = '';
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(_db["default"].query(query));

        case 8:
          queryResult = _context.sent;

          if (queryResult.rowCount) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            status: 404,
            error: ['Authentication Failed']
          }));

        case 11:
          // if a record is found, get the hashed password
          if (queryResult.rows[0]) {
            hashed = queryResult.rows[0].password;
          } // comparing the password


          _bcrypt["default"].compare(password, hashed, function (err, compareRes) {
            // if comparision fails
            if (!compareRes) {
              return res.status(409).json({
                status: 409,
                error: ['Auth failed']
              });
            } // comparision passes, log user in


            if (compareRes) {
              // create a login token
              var token = _jsonwebtoken["default"].sign({
                username: username,
                userId: queryResult.rows[0].id,
                loggedIn: Date.now()
              }, process.env.JWT_KEY, {
                expiresIn: '24h'
              });

              return res.status(200).json({
                status: 200,
                message: 'Successfully logged in!',
                token: token
              });
            }
          }); // .catch(e => console.log(e))


          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);

        case 18:
          _context.next = 21;
          break;

        case 20:
          return _context.abrupt("return", res.status(500).json({
            status: 500,
            error: result.error.details.map(function (detail) {
              return detail.message;
            })
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 15]]);
}

var _default = signIn;
exports["default"] = _default;