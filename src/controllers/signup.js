import bcrypt from 'bcrypt';
import pool from '../models/db';

const signUp = (req, res, next) => {
  const { username, password } = req.body;

  pool
    .query(`SELECT * FROM USERS where username = '${username}';`)
    .then((r) => {
      // check if mail exists before signing in
      if (r.rows[0]) {
        return res.status(409).json({
          status: 409,
          message: 'Error Signing up. Username Already Exists',
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
            const query = `INSERT INTO users (username, password, registered) VALUES ('${username}', '${hash}', NOW());`;
            // run the query
            pool
              .query(query)
              .then((r) => {
                res.status(200).json({ message: 'Successfully created a new account' });
              })
              .catch(e => console.log(e.stack));
          }
        });
    });


};

export default signUp;
