"use strict";

const supertest = require('supertest');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const app = require('../app'); // GENERATE ACCESS TOKEN


const payload = {
  username: 'iAmRegistered',
  userId: 10,
  loggedIn: Date.now()
};
const secret = process.env.JWT_KEY;
const token = jwt.sign(payload, secret, {
  expiresIn: '1h'
});

const pool = require('../models/db');

process.env.NODE_ENV = 'test';
describe('The message/question creation flow', () => {
  let hashed = '';
  bcrypt.hash('password', 10, (err, hash) => {
    hashed = hash;
  });
  beforeAll(async () => {
    await pool.query(`INSERT INTO users (id, username, password, registered) VALUES (10, 'iAmRegistered', '${hashed}', NOW());`);
  });
  it('should create a question for a registered user and return a success message', async () => {
    const response = await supertest(app).post('/api/v1/ask').send({
      question: 'This is a question',
      meantFor: 'iAmRegistered'
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('Successfully created the question');
  });
  it('should not create a question for an unregistered user', async () => {
    const response = await supertest(app).post('/api/v1/ask').send({
      question: 'This is a question',
      meantFor: 'iAmNotARegisteredUser'
    });
    expect(response.status).toBe(409);
    expect(response.body.status).toBe(409);
    expect(response.body.error).toBe('Cannot create question for a user that does not exist');
  });
  it('should not create an empty question', async () => {
    const response = await supertest(app).post('/api/v1/ask').send({
      question: '',
      meantFor: 'iAmNotARegisteredUser'
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.error).toContain('"question" is not allowed to be empty');
    expect(response.body.error).toContain('"question" length must be at least 5 characters long');
  });
  it('should not create a question if the user meantFor is not specified', async () => {
    const response = await supertest(app).post('/api/v1/ask').send({
      question: 'This question will not be posted!',
      meantFor: ''
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.error).toContain('"meantFor" is not allowed to be empty');
    expect(response.body.error).toContain('"meantFor" length must be at least 3 characters long');
    expect(response.body.error).toContain('"meantFor" must only contain alpha-numeric characters');
  });
  it('should get all questions for a registered and authenticated user', async () => {
    const response = await supertest(app).get('/api/v1/questions').set({
      Accept: 'application/json',
      authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(200);
    expect(response.body.messages).toBeTruthy();
    expect(response.body.messages[0]).toHaveProperty('question');
    expect(response.body.messages[0]).toHaveProperty('timeplaced');
    expect(response.body.messages[0]).toHaveProperty('answered');
    expect(response.body.messages[0]).toHaveProperty('reply');
  });
  it('should not get questions for a user without access token', async () => {
    const response = await supertest(app).get('/api/v1/questions').set({
      Accept: 'application/json'
    });
    expect(response.status).toBe(401);
    expect(response.body.messages).toBeUndefined();
    expect(response.body.message).toBe('Authentication Failed');
  });
  afterAll(async () => {
    await pool.query('DELETE FROM users;DELETE FROM questions;');
  });
});