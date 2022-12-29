import 'jest';
import supertest from 'supertest';
import app from '../app';
import { v4 as uuid } from 'uuid';

describe('User Controller', () => {
  describe('Create', () => {
    it('should return 201 if user has been created', async () => {
      const username = uuid();
      const password = uuid();
      const response = await supertest(app)
        .post('/user/create')
        .send({ username: username, password: password });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User has been created.');
      expect(response.body.user).toBeInstanceOf(Object);
      expect(response.body.user.username).toBe(username);
      expect(response.body.user.password).not.toBe(password);
    });

    it('should return 400 if request body is empty', async () => {
      const response = await supertest(app)
        .post('/user/create')
        .send({});
      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe('Something went wrong! Try again.');
    });

    it('should return 400 if username or password is an empty string', async () => {
      const response = await supertest(app)
        .post('/user/create')
        .send({
          username: '',
          password: '',
        });
      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe('Username and password should not be empty.');
    });
  });

  describe('Login', () => {
    it('should return 200 if login is completed', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'Teste', password: 'Teste' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login completed.');
      expect(response.body.user).toBe('Teste');
    });

    it('should return 401 if username dont exists', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'wrong_username', password: 'any_password' });
      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe('User not found!');
    });

    it('should return 401 when username is correct but password is wrong', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'Teste', password: 'wrong_password' });
      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe('Username or password is incorrect!');
    });
  });
});
