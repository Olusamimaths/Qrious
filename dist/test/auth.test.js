"use strict";

const supertest = require('supertest');

const bcrypt = require('bcrypt');

const app = require('../app');

const pool = require('../models/db');

process.env.NODE_ENV = 'test';
describe('The registration flow', () => {
  beforeAll(async () => {
    await pool.query('DELETE FROM users;');
  });
  it('should register a new user to the database and retun the newly created user', async () => {
    const response = await supertest(app).post('/api/v1/signup').send({
      username: 'newUser0',
      password: 'newUser0'
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('Successfully created a new account');
    expect(response.body.token).not.null;
  });
  it('should not register a user if the username is not present', async () => {
    const response = await supertest(app).post('/api/v1/signup').send({
      password: 'newUser0'
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(response.body.token).toBeUndefined();
    expect(response.body.error).array;
    expect(response.body.error).toContain('"username" is required');
  });
  it('should not register a user if the password is not present', async () => {
    const response = await supertest(app).post('/api/v1/signup').send({
      username: 'newUsername'
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(response.body.token).toBeUndefined();
    expect(response.body.error).array;
    expect(response.body.error).toContain('"password" is required');
  });
  it('should not register a user if the length of the username is less than 3', async () => {
    const response = await supertest(app).post('/api/v1/signup').send({
      username: 'd',
      password: 'newUser0'
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(response.body.token).toBeUndefined();
    expect(response.body.error).array;
    expect(response.body.error).toContain('"username" length must be at least 3 characters long');
  });
  it('should not register a user if the length of the username is more than 30', async () => {
    const response = await supertest(app).post('/api/v1/signup').send({
      username: 'ThisUserNameShouldHaveLengthThatIsMoreThanThirtySoItISInvalid',
      password: 'newUser0'
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(response.body.token).toBeUndefined();
    expect(response.body.error).array;
    expect(response.body.error).toContain('"username" length must be less than or equal to 30 characters long');
  });
  it('should not register a user if the length of the password is less than 3', async () => {
    const response = await supertest(app).post('/api/v1/signup').send({
      username: 'newUser0',
      password: 'kd'
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(response.body.token).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
  afterAll(async () => {
    await pool.close();
  });
});
describe('The signin flow', () => {
  let hashed = '';
  bcrypt.hash('password', 10, (err, hash) => {
    hashed = hash;
  });
  beforeAll(async () => {
    await pool.query(`INSERT INTO users (username, password, registered) VALUES ('username', '${hashed}', NOW()) RETURNING *;`);
  });
  it('should sign a registered user in', async () => {
    const response = await supertest(app).post('/api/v1/signin').send({
      username: 'username',
      password: 'password'
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('Successfully logged in!');
    expect(response.body.token).toBeTruthy();
  });
  it('should not sign a user in if the username is not supplied', async () => {
    const response = await supertest(app).post('/api/v1/signin').send({
      password: 'password'
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(response.body.error).toContain('"username" is required');
  });
  it('should not sign a user in if the password is not supplied', async () => {
    const response = await supertest(app).post('/api/v1/signin').send({
      username: 'newUser'
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(response.body.error).toContain('"password" is required');
  });
  it('should not sign an unregistered user', async () => {
    const response = await supertest(app).post('/api/v1/signin').send({
      username: 'iAmNotRegistered',
      password: 'iDontExist'
    });
    expect(response.status).toBe(404);
    expect(response.body.status).toBe(404);
    expect(response.body.message).toBeUndefined();
    expect(response.body.error).toContain('Authentication Failed');
  });
  afterAll(async () => {
    await pool.query('DELETE FROM users;');
  });
});