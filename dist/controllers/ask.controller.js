"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ask = _interopRequireDefault(require("../helper/ask.validator"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * This module creates a 'post' ( question )
 * required: content of question, who is placing the question, who it is meant for
 * Requires no authentication
 */
var ask = function ask(req, res, next) {
  var _req$body = req.body,
      question = _req$body.question,
      meantFor = _req$body.meantFor; // validate the input

  var result = (0, _ask["default"])(question, meantFor);

  if (!result.error) {
    // do query stuff
    // first find the user and make sure it exists
    _db["default"].query("SELECT * FROM USERS where username = '".concat(meantFor, "'")).then(function (r) {
      if (r.rows[0]) {
        // User exist, do create the question for him
        var query = "INSERT INTO questions (question, placedBy, meantFor, timePlaced, answered) VALUES ('".concat(question, "', 'Anonymous', '").concat(r.rows[0].id, "', NOW(), 'false') RETURNING *");

        _db["default"].query(query).then(function (r) {
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

var _default = ask;
exports["default"] = _default;