"use strict";

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUserTable = `CREATE TABLE users (id SERIAL PRIMARY KEY NOT NULL,
    username varchar(30) NOT NULL,
    password varchar NOT NULL,
    registered timestamptz
    )`;
const createQuestionTable = `CREATE TABLE questions (id SERIAL PRIMARY KEY NOT NULL,
      question varchar NOT NULL,
      placedBy varchar(30) NOT NULL,
      meantFor int NOT NULL, 
      timePlaced timestamptz,
      reply varchar,
      answered boolean NOT NULL
      )
      `;

const runQuery = query => {
  _db.default.connect().then(client => client.query(query).then(res => {
    client.release();
    console.log(`Successfully ran query: ${query}`);
  }).catch(e => {
    client.release();
    console.log(e.stack);
  }));
};

runQuery(`DROP TABLE IF EXISTS questions;${createQuestionTable};${createUserTable};
  `);