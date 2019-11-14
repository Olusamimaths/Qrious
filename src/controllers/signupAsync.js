import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db';
import validate from '../helper/signup.validator';

async function signup(req, res, next) {
  const { username, password } = req.body;
  const result = validate(username, password);

  if (!result.error) {
    const query = `SELECT * FROM users WHERE username = '${username}';`;

    try {
      const queryResult = await pool.query(query);

      // check if username exists before signing up
      if (queryResult.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Error Signing up. Username Already Exists',
        });
      }

      bcrypt
        .hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              status: 500,
              error: err,
            });
          } else {
            const queryRegister = `INSERT INTO users (username, password, registered) VALUES ('${username}', '${hash}', NOW()) RETURNING *;`;
            
            
            // run the query
             try {
              const regResult = await pool.query(queryRegister);
              // create a sign up token
              const token = jwt.sign({
                id: r.rows[0].id,
                username: r.rows[0].username,
              }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES });

              // send a success message
              res.status(200).json({
                status: 200,
                message: 'Successfully created a new account',
                token,
              });
            } catch (error) {
              console.log('insertion error', error.stack);
            }

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
