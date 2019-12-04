"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _signup = _interopRequireDefault(require("../helper/signup.validator"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signUp = (req, res, next) => {
  const {
    username,
    password
  } = req.body; // validate the input

  const result = (0, _signup.default)(username, password);

  if (!result.error) {
    _db.default.query(`SELECT * FROM USERS where username = '${username}';`).then(r => {
      // check if username exists before signing up
      if (r.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: ['Username Already Exists']
        });
      } // register the new user
      // first hash the password


      _bcrypt.default.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            status: 500,
            error: err
          });
        } else {
          const query = `INSERT INTO users (username, password, registered) VALUES ('${username}', '${hash}', NOW()) RETURNING *;`; // run the query

          _db.default.query(query).then(r => {
            // create a sign up token
            const token = _jsonwebtoken.default.sign({
              userId: r.rows[0].id,
              username: r.rows[0].username
            }, process.env.JWT_KEY, {
              expiresIn: process.env.JWT_EXPIRES
            });

            res.status(200).json({
              status: 200,
              message: 'Successfully created a new account',
              token
            });
          }).catch(e => console.log('insertion error', e.stack));
        }
      });
    }).catch(e => console.log('unique user check error', e.stack));
  } else {
    // validation error
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(detail => detail.message)
    });
  }
};

var _default = signUp;
exports.default = _default;