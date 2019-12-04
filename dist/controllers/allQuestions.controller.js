import "core-js/modules/es6.array.map";
import "regenerator-runtime/runtime";

/**
 * This module gets all the questions meant for a given user
 */
import jwt from 'jsonwebtoken';
import validate from '../helper/reply.validator';
import pool from '../models/db';

function getQuestions(req, res, next) {
  var userId, query, queryResult, messages;
  return regeneratorRuntime.async(function getQuestions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.userData.userId;
          query = "SELECT * FROM questions  WHERE meantfor = ".concat(userId, " ORDER BY timeplaced DESC;");
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(pool.query(query));

        case 5:
          queryResult = _context.sent;

          if (!queryResult.rows[0]) {
            _context.next = 9;
            break;
          }

          // build the questions
          messages = queryResult.rows.map(function (item) {
            return {
              question: item.question,
              timeplaced: item.timeplaced,
              answered: item.answered,
              reply: item.reply
            };
          });
          return _context.abrupt("return", res.status(200).json({
            status: 200,
            messages: messages
          }));

        case 9:
          return _context.abrupt("return", res.status(404).json({
            status: 404,
            message: 'No question found for this user'
          }));

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", res.status(500).json({
            status: 500,
            error: 'Internal server error'
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

export default getQuestions;