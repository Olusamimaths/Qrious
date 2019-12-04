import "core-js/modules/es6.array.map";
import "regenerator-runtime/runtime";

/**
 * This module replies a 'post' ( question )
 * required: content of reply, question id
 * find the question and answer it
 * Users should only be able to reply to questions meant for them
 */
import jwt from 'jsonwebtoken';
import validate from '../helper/reply.validator';
import pool from '../models/db';

function reply(req, res, next) {
  var answer, questionId, userId, result, query, queryResult;
  return regeneratorRuntime.async(function reply$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          answer = req.body.answer;
          questionId = req.params.questionId;
          userId = req.userData.userId;
          result = validate(answer);

          if (result.error) {
            _context.next = 20;
            break;
          }

          query = "UPDATE questions SET reply = '".concat(answer, "', answered = true WHERE id = ").concat(questionId, " AND meantfor = ").concat(userId, " RETURNING *;");
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(pool.query(query));

        case 9:
          queryResult = _context.sent;

          if (!queryResult.rows[0]) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            status: 200,
            message: 'Successfully answered the question'
          }));

        case 12:
          return _context.abrupt("return", res.status(404).json({
            status: 404,
            message: 'Question not found for this user'
          }));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](6);
          return _context.abrupt("return", res.status(500).json({
            status: 500,
            error: 'An error occured'
          }));

        case 18:
          _context.next = 21;
          break;

        case 20:
          return _context.abrupt("return", res.status(500).json({
            status: 500,
            error: result.error.details.map(function (detail) {
              return detail.message;
            })
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 15]]);
}

export default reply;