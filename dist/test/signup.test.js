import chai from 'chai';
import chaiHttp from 'chai-http';
import deleteUser from '../helper/deleteUser';

var server = require('../server'); // // GENERATE ACCESS TOKEN
// const payload = { username: 'adunni', password: 'fish' };
// const secret = process.env.JWT_KEY;
// const token = jwt.sign(payload, secret, { expiresIn: '1h' });


chai.use(chaiHttp);
var expect = chai.expect;
describe('USERS SECTION', function () {
  describe('REGISTER USER', function () {
    it('Registers a new user', function () {
      chai.request(server).post('/api/v1/signup').send({
        username: 'whatishappeningBayi',
        password: 'whatever'
      }).end(function (err, res) {
        expect(err).to.be["null"];
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status').equal(200);
        expect(res.body).to.have.property('message').equal('Successfully created a new account');
        expect(res.body).to.have.property('token');
      });
    });
    it('Signs a user in', function () {
      chai.request(server).post('/api/v1/signin').send({
        username: 'whatishappeningBayi',
        password: 'whatever'
      }).end(function (err, res) {
        expect(err).to.be["null"];
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status').equal(200);
        expect(res.body).to.have.property('message').equal('Successfully logged in!');
        expect(res.body).to.have.property('token');
      });
    });
  });
});