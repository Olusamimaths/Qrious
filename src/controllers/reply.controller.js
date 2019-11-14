/**
 * This module replies a 'post' ( question )
 * required: content of reply, question id
 * find the question and answer it
 */

import validate from '../helper/reply.validator';
import pool from '../models/db';

const reply = (req, res, next) => {
  const { answer } = req.body;
  const { id } = req.query;

  const result = validate(answer);

  if (!result.error) {
    const query = `SELECT * FROM questions WHERE meantFor = '${id}';`;
    pool
     .query(query)
     .then((r) => {
         if(r.rows[0]){
             
         }
     })
  }


};

export default reply;
