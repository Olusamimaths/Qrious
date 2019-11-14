import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db';
import validate from '../helper/signup.validator';

async function signIn(req, res, next) {
  const { username, password } = req.body;
  const result = validate(username, password);

  if (!result.error) {
    const query = `SELECT * FROM users WHERE username = '${username}';`;
    let hashed = '';

    try {
      const queryResult = await pool.query(query);

      if (!queryResult.rowCount) {
        return res.status(404).json({
          status: 404,
          error: 'Authentication Failed',
        });
      }
      // if a record is found, get the hashed password
      if (queryResult.rows[0]) {
        hashed = queryResult.rows[0].password;
      }

      // comparing the password
      bcrypt.compare(password, hashed, (err, compareRes) => {
        // if comparision fails
        if (!compareRes) {
          return res.status(409).json({
            status: 409,
            error: 'Auth failed',
          });
        }

        // comparision passes, log user in
        if (compareRes) {
          // create a login token
          const token = jwt.sign({
            username,
            loggedIn: Date.now(),
          }, process.env.JWT_KEY, { expiresIn: '24h' });

          return res.status(200).json({
            status: 200,
            message: 'Successfully logged in!',
            token,
          });
        }
      });
      // .catch(e => console.log(e))
    } catch (err) {
      console.log(err);
    }

  } else { // validation error
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(detail => detail.message),
    });
  }

  //   return res.status(500).json({
  //     status: 500,
  //     message: 'Internal Server Error, please report this',
  //   });

}

export default signIn;
