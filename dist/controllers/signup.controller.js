import "core-js/modules/es6.array.map";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validate from '../helper/signup.validator';
import pool from '../models/db';

var signUp = function signUp(req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password; // validate the input

  var result = validate(username, password);

  if (!result.error) {
    pool.query("SELECT * FROM USERS where username = '".concat(username, "';")).then(function (r) {
      // check if username exists before signing up
      if (r.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: ['Username Already Exists']
        });
      } // register the new user
      // first hash the password


      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          res.status(500).json({
            status: 500,
            error: err
          });
        } else {
          var query = "INSERT INTO users (username, password, registered) VALUES ('".concat(username, "', '").concat(hash, "', NOW()) RETURNING *;"); // run the query

          pool.query(query).then(function (r) {
            // create a sign up token
            var token = jwt.sign({
              userId: r.rows[0].id,
              username: r.rows[0].username
            }, process.env.JWT_KEY, {
              expiresIn: process.env.JWT_EXPIRES
            });
            res.status(200).json({
              status: 200,
              message: 'Successfully created a new account',
              token: token
            });
          })["catch"](function (e) {
            return console.log('insertion error', e.stack);
          });
        }
      });
    })["catch"](function (e) {
      return console.log('unique user check error', e.stack);
    });
  } else {
    // validation error
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(function (detail) {
        return detail.message;
      })
    });
  }
};

export default signUp;