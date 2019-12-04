"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteUser = async username => {
  const query = `DELETE FROM users WHERE username = ${username}`;
  const queryResult = await _db.default.query(query);
  return queryResult;
};

var _default = deleteUser;
exports.default = _default;