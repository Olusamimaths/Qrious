"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../models/db"));

var _signup = _interopRequireDefault(require("../helper/signup.validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signIn(req, res, next) {
  const {
    username,
    password
  } = req.body;
  const result = (0, _signup.default)(username, password);

  if (!result.error) {
    const query = `SELECT * FROM users WHERE username = '${username}';`;
    let hashed = '';

    try {
      const queryResult = await _db.default.query(query);

      if (!queryResult.rowCount) {
        return res.status(404).json({
          status: 404,
          error: ['Authentication Failed']
        });
      } // if a record is found, get the hashed password


      if (queryResult.rows[0]) {
        hashed = queryResult.rows[0].password;
      } // comparing the password


      _bcrypt.default.compare(password, hashed, (err, compareRes) => {
        // if comparision fails
        if (!compareRes) {
          return res.status(409).json({
            status: 409,
            error: ['Auth failed']
          });
        } // comparision passes, log user in


        if (compareRes) {
          // create a login token
          const token = _jsonwebtoken.default.sign({
            username,
            userId: queryResult.rows[0].id,
            loggedIn: Date.now()
          }, process.env.JWT_KEY, {
            expiresIn: '24h'
          });

          return res.status(200).json({
            status: 200,
            message: 'Successfully logged in!',
            token
          });
        }
      }); // .catch(e => console.log(e))

    } catch (err) {
      console.log(err);
    }
  } else {
    // validation error
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(detail => detail.message)
    });
  }
}

var _default = signIn;
exports.default = _default;