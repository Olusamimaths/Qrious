"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _deleteUser = _interopRequireDefault(require("../helper/deleteUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = require('../server'); // // GENERATE ACCESS TOKEN
// const payload = { username: 'adunni', password: 'fish' };
// const secret = process.env.JWT_KEY;
// const token = jwt.sign(payload, secret, { expiresIn: '1h' });


_chai.default.use(_chaiHttp.default);

const {
  expect
} = _chai.default;
describe('USERS SECTION', () => {
  describe('REGISTER USER', () => {
    it('Registers a new user', () => {
      _chai.default.request(server).post('/api/v1/signup').send({
        username: 'whatishappeningBayi',
        password: 'whatever'
      }).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status').equal(200);
        expect(res.body).to.have.property('message').equal('Successfully created a new account');
        expect(res.body).to.have.property('token');
      });
    });
    it('Signs a user in', () => {
      _chai.default.request(server).post('/api/v1/signin').send({
        username: 'whatishappeningBayi',
        password: 'whatever'
      }).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status').equal(200);
        expect(res.body).to.have.property('message').equal('Successfully logged in!');
        expect(res.body).to.have.property('token');
      });
    });
  });
});