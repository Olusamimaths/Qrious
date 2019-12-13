"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module gets all the questions meant for a given user
 */
async function getQuestions(req, res, next) {
  const {
    userId
  } = req.userData;
  const query = `SELECT * FROM questions  WHERE meantfor = ${userId} ORDER BY timeplaced DESC;`;

  try {
    const queryResult = await _db.default.query(query);

    if (queryResult.rows[0]) {
      // build the questions
      const messages = queryResult.rows.map(item => {
        return {
          question: item.question,
          timeplaced: item.timeplaced,
          answered: item.answered,
          reply: item.reply
        };
      });
      return res.status(200).json({
        status: 200,
        messages
      });
    } // no result 


    return res.status(404).json({
      status: 404,
      message: 'No question found for this user'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error'
    });
  }
}

var _default = getQuestions;
exports.default = _default;