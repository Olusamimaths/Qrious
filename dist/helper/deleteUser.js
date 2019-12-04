import "regenerator-runtime/runtime";
import pool from '../models/db';

var deleteUser = function deleteUser(username) {
  var query, queryResult;
  return regeneratorRuntime.async(function deleteUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "DELETE FROM users WHERE username = ".concat(username);
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query(query));

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

export default deleteUser;