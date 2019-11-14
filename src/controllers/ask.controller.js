/**
 * This module creates a 'post' ( question )
 * required: content of question, who is placing the question, who it is meant for
 * Requires no authentication
 */
import validate from '../helper/ask.validator';
import pool from '../models/db';

const ask = (req, res, next) => {
  const { question, placedBy, meantFor } = req.body;

  // validate the input
  const result = validate(question, placedBy, meantFor);

  if (!result.error) {
    // do query stuff
    // first find the user and make sure it exists
    pool
      .query(`SELECT * FROM USERS where username = '${meantFor}'`)
      .then((r) => {
        if (r.rows[0]) {
          // User exist, do create the question for him
          const query = `INSERT INTO questions (question, placedBy, meantFor, timePlaced, answered) VALUES ('${question}', '${placedBy}', '${r.rows[0].id}', NOW(), 'false') RETURNING *`;
          pool
            .query(query)
            .then(r => res.status(200).json({
              message: 'Successfully created the question',
            }))
            .catch(e => res.status(500).json({
              error: 'Could not create the new question' + e,
            }));
        } else {
          // User does not exist, return an error
          return res.status(409).json({
            status: 409,
            error: 'Cannot create question for a user that does not exist',
          });
        }
      });

  } else {
    // validation of input failed
    return res.status(500).json({
      status: 500,
      error: result.error.details.map(detail => detail.message),
    });
  }

};

export default ask;
