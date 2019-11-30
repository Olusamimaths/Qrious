import chai from 'chai';
import chaiHttp from 'chai-http';
const jwt = require('jsonwebtoken');

const server = require('../server');
console.log(server)
//process.env.NODE_ENV = 'test';

// // GENERATE ACCESS TOKEN
// const payload = { username: 'adunni', password: 'fish' };
// const secret = process.env.JWT_KEY;
// const token = jwt.sign(payload, secret, { expiresIn: '1h' });

var assert = require('assert');

chai.use(chaiHttp);
let expect = chai.expect;

describe('SIGNUP', () => {
  it('Should sign a user up', (done) => {
    chai.request(server)
      .post('/api/v1/signup')
      .send({
        username: 'kudsi', password: '1234',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status').equal(200);
        expect(res.body).to.have.property('message').equal('Successfully created a new account');
        expect(res.body).to.have.property('token');
        done();
      })
  });
});
