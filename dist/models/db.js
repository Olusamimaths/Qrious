"use strict";

var _pg = require("pg");

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = (0, _config.default)(process.env.NODE_ENV);
const {
  connectionString
} = config;
const pool = new _pg.Pool({
  connectionString
});
pool.on('connect', () => {//console.log('connected to the db');
});
pool.connect().then(() => console.log(`Pool connected successfully`)).catch(e => console.log(e.stack));
module.exports = pool; // export default pool;