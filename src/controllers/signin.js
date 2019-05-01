import bcrypt from 'bcrypt';
import pool from '../models/db';
import validate from '../helper/signup.validator';

const signIn = (req, res, next) => {
  const { username, password } = req.body;
  const result = validate(username, password);

  if (!result.error) {
    const query = `SELECT * FROM users WHERE username = '${username}';`;
    let hashed = '';
    pool
      .query(query)
      .then((r) => {
        console.log(r);
        // if no record of the user was found
        if (!r.rowCount) {
          return res.status(404).json({
            status: 404,
            error: 'Authentication Failed',
          });
        }

        // if a record is found, get the hashed password
        if (r.rows[0]) {
          hashed = r.rows[0].password;
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

          // comparision passes log user in
          if(compareRes){
            return res.status(200).json({
              status: 200,
              message: 'Successfully logged in!',
            });
          }
        });
      })
      .catch(e => console.log(e))
    ;
  } else { // validation failed
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(detail => detail.message),
    });
  }
  // res.status(200).json({ message: 'Please sign in' });
};

export default signIn;
