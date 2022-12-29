import 'jest';
import supertest from 'supertest';
import app from '../app';
import { username, password } from './userController.test';

describe('Brewery Controller', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await supertest(app)
      .get('/breweries')
      .query({ query: 'Teste' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token is missing.');
  });

  it('should return 200 if valid token was provided', async () => {
    // Login and receive valid token
    const loginResponse = await supertest(app)
      .post('/login')
      .send({ username, password });

    // Set token into header Authorization
    const response = await supertest(app)
      .get('/breweries')
      .set('Authorization', `Bearer ${loginResponse.body.jwtToken}`);

    expect(response.status).toBe(200);
  });
});
