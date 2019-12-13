import { Pool } from 'pg';
import configuration from '../config/config';

const config = configuration(process.env.NODE_ENV);

const { connectionString } = config;

const pool = new Pool({ connectionString });

pool.on('connect', () => {
  //console.log('connected to the db');
});


pool.connect()
  .then(() => console.log(`Pool connected successfully`))
  .catch(e => console.log(e.stack));

module.exports = pool;
// export default pool;
