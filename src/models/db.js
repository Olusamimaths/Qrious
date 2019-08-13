import { Pool } from 'pg';
import configuration from '../config/config';

const config = configuration(process.env.NODE_ENV);

const { connectionString } = config;

const pool = new Pool({ connectionString });

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUserTable = `CREATE TABLE users (id SERIAL PRIMARY KEY NOT NULL,
  username varchar(30) NOT NULL,
  password varchar NOT NULL,
  registered TIMESTAMP
  )`;

const createQuestionTable = `CREATE TABLE questions (id SERIAL PRIMARY KEY NOT NULL,
    question varchar(250) NOT NULL,
    placedBy varchar(30) NOT NULL,
    meantFor varchar(30) NOT NULL, 
    timePlaced TIMESTAMP,
    reply varchar,
    answered boolean NOT NULL
    )
    `;
const runQuery = (query) => {
  pool.connect()
    .then(client => client.query(query)
      .then((res) => {
        client.release();
        console.log('Successfully ran query: ' + query);
      })
      .catch((e) => {
        client.release();
        console.log(e.stack);
      }));
};

pool.connect()
  .then(() => console.log(`Pool connected successfully`))
  .catch(e => console.log(e.stack));

export default pool;

// runQuery(
//   `DROP TABLE IF EXISTS questions;${createQuestionTable};
//   `
// )
