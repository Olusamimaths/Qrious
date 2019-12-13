"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reply = _interopRequireDefault(require("../helper/reply.validator"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module replies a 'post' ( question )
 * required: content of reply, question id
 * find the question and answer it
 * Users should only be able to reply to questions meant for them
 */
async function reply(req, res, next) {
  const {
    answer
  } = req.body;
  const {
    questionId
  } = req.params;
  const {
    userId
  } = req.userData;
  const result = (0, _reply.default)(answer);

  if (!result.error) {
    const query = `UPDATE questions SET reply = '${answer}', answered = true WHERE id = ${questionId} AND meantfor = ${userId} RETURNING *;`;

    try {
      const queryResult = await _db.default.query(query);

      if (queryResult.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: 'Successfully answered the question'
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'Question not found for this user'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'An error occured'
      });
    }
  } else {
    // validation error
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(detail => detail.message)
    });
  }
}

var _default = reply;
exports.default = _default;