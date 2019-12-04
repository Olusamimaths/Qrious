"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var deleteUser = function deleteUser(username) {
  var query, queryResult;
  return regeneratorRuntime.async(function deleteUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "DELETE FROM users WHERE username = ".concat(username);
          _context.next = 3;
          return regeneratorRuntime.awrap(_db["default"].query(query));

        case 3:
          queryResult = _context.sent;
          return _context.abrupt("return", queryResult);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = deleteUser;
exports["default"] = _default;