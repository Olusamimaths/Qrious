import { Pool } from 'pg';
import configuration from '../config/config';
var config = configuration(process.env.NODE_ENV);
var connectionString = config.connectionString;
var pool = new Pool({
  connectionString: connectionString
});
pool.on('connect', function () {//console.log('connected to the db');
});
var createUserTable = "CREATE TABLE users (id SERIAL PRIMARY KEY NOT NULL,\n  username varchar(30) NOT NULL,\n  password varchar NOT NULL,\n  registered timestamptz\n  )";
var createQuestionTable = "CREATE TABLE questions (id SERIAL PRIMARY KEY NOT NULL,\n    question varchar NOT NULL,\n    placedBy varchar(30) NOT NULL,\n    meantFor int NOT NULL, \n    timePlaced timestamptz,\n    reply varchar,\n    answered boolean NOT NULL\n    )\n    ";

var runQuery = function runQuery(query) {
  pool.connect().then(function (client) {
    return client.query(query).then(function (res) {
      client.release();
      console.log('Successfully ran query: ' + query);
    })["catch"](function (e) {
      client.release();
      console.log(e.stack);
    });
  });
};

pool.connect().then(function () {
  return console.log("Pool connected successfully");
})["catch"](function (e) {
  return console.log(e.stack);
});
export default pool; // runQuery(
//   `DROP TABLE IF EXISTS questions;${createQuestionTable};${createUserTable};
//   `
// )