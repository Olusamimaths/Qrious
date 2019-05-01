import pool from '../models/db';

const signUp = (req, res, next) => {
  const { username, password} = req.body;
  const query = `INSERT INTO users (username, password, registered) VALUES ('${username}', '${password}', NOW());`;
  pool
    .query(query)
    .then(r => console.log(r))
    .catch(e => console.log(e.stack));

  res.status(200).json({ message: 'Please sign up' });
};

export default signUp;
