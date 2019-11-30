import pool from '../models/db';

const deleteUser = async (username) => {
  const query = `DELETE FROM users WHERE username = ${username}`;
  const queryResult = await pool.query(query);
  return queryResult;
};

export default deleteUser;
