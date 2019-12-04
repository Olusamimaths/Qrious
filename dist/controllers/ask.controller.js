import "core-js/modules/es6.array.map";

/**
 * This module creates a 'post' ( question )
 * required: content of question, who is placing the question, who it is meant for
 * Requires no authentication
 */
import validate from '../helper/ask.validator';
import pool from '../models/db';

var ask = function ask(req, res, next) {
  var _req$body = req.body,
      question = _req$body.question,
      meantFor = _req$body.meantFor; // validate the input

  var result = validate(question, meantFor);

  if (!result.error) {
    // do query stuff
    // first find the user and make sure it exists
    pool.query("SELECT * FROM USERS where username = '".concat(meantFor, "'")).then(function (r) {
      if (r.rows[0]) {
        // User exist, do create the question for him
        var query = "INSERT INTO questions (question, placedBy, meantFor, timePlaced, answered) VALUES ('".concat(question, "', 'Anonymous', '").concat(r.rows[0].id, "', NOW(), 'false') RETURNING *");
        pool.query(query).then(function (r) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully created the question'
          });
        })["catch"](function (e) {
          return res.status(500).json({
            error: 'Could not create the new question: ' + e
          });
        });
      } else {
        // User does not exist, return an error
        return res.status(409).json({
          status: 409,
          error: 'Cannot create question for a user that does not exist'
        });
      }
    });
  } else {
    // validation of input failed
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(function (detail) {
        return detail.message;
      })
    });
  }
};

export default ask;