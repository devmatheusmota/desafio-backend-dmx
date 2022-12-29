import 'jest';
import { UserInMemoryRepository } from '../repository/in-memoryRepository/UserInMemoryRepository';
import { CreateUser } from './CreateUser';
import { UserLogin } from './UserLogin';

const repository = new UserInMemoryRepository();
const userLogin = new UserLogin(repository);
const createUser = new CreateUser(repository);

describe('UserLogin Usecase', () => {
  it(`should throw if password dont match`, async () => {
    await createUser.execute({ username: 'Teste', password: 'Teste' });

    await expect(userLogin.execute({ username: 'Teste', password: 'Teste_errado' })).rejects.toMatchObject({
      message: 'Username or password is incorrect!',
      statusCode: 401,
    });
  });

  it('should throw if user dont exist', async () => {
    await expect(userLogin.execute({ username: 'Test', password: 'Teste' })).rejects.toMatchObject({
      message: 'User not found!',
      statusCode: 401,
    });
  });

  it('should return JWT token if credentials are right', async () => {
    await createUser.execute({ username: 'Teste', password: 'Teste' });
    const user = await userLogin.execute({ username: 'Teste', password: 'Teste' });
    expect(user).toHaveProperty('jwtToken');
    expect(user.jwtToken).toBeTruthy();
  });
});
