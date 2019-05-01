import { Pool } from 'pg';
import configuration from '../config/config';

const config = configuration(process.env.NODE_ENV);

const { connectionString } = config;

console.log(connectionString)

const pool = new Pool({ connectionString });
pool.connect();

pool.on('connect', () => {
  console.log('connected to the db');
});

