import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validate from '../helper/signup.validator';
import pool from '../models/db';

const signUp = (req, res, next) => {
  const { username, password } = req.body;
  // validate the input
  const result = validate(username, password);

  if (!result.error) {
    pool
      .query(`SELECT * FROM USERS where username = '${username}';`)
      .then((r) => {
      // check if username exists before signing up
        if (r.rows[0]) {
          return res.status(409).json({
            status: 409,
            error: 'Error Signing up. Username Already Exists',
          });
        }
        // register the new user
        // first hash the password
        bcrypt
          .hash(password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({
                status: 500,
                error: err,
              });
            } else {
              const query = `INSERT INTO users (username, password, registered) VALUES ('${username}', '${hash}', NOW()) RETURNING *;`;
              // run the query
              pool
                .query(query)
                .then((r) => {
                  // create a sign up token
                  const token = jwt.sign({
                    userId: r.rows[0].id,
                    username: r.rows[0].username,
                  }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES });

                  res.status(200).json({
                    status: 200,
                    message: 'Successfully created a new account',
                    token,
                  });
                })
                .catch(e => console.log('insertion error', e.stack));
            }
          });
      })
      .catch(e => console.log('unique user check error', e.stack));
  } else { // validation error
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(detail => detail.message),
    });
  }
};

export default signUp;
