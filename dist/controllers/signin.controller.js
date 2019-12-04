import "core-js/modules/es6.array.map";
import "core-js/modules/es6.date.now";
import "regenerator-runtime/runtime";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db';
import validate from '../helper/signup.validator';

function signIn(req, res, next) {
  var _req$body, username, password, result, query, hashed, queryResult;

  return regeneratorRuntime.async(function signIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          result = validate(username, password);

          if (result.error) {
            _context.next = 20;
            break;
          }

          query = "SELECT * FROM users WHERE username = '".concat(username, "';");
          hashed = '';
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(pool.query(query));

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


          bcrypt.compare(password, hashed, function (err, compareRes) {
            // if comparision fails
            if (!compareRes) {
              return res.status(409).json({
                status: 409,
                error: ['Auth failed']
              });
            } // comparision passes, log user in


            if (compareRes) {
              // create a login token
              var token = jwt.sign({
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

export default signIn;