import pool from '../models/db';

const signIn = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.status(200).json({ message: 'Please sign in'});
};

export default signIn;
