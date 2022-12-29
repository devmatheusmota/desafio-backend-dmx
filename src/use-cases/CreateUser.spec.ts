import { compare } from 'bcrypt';
import 'jest';
import { UserInMemoryRepository } from '../repository/in-memoryRepository/UserInMemoryRepository';
import { CreateUser } from './CreateUser';

const repository = new UserInMemoryRepository();
const createUser = new CreateUser(repository);

describe('CreateUser Usecase', () => {
  it(`should throw if username or password is an empty string`, async () => {
    await expect(createUser.execute({ username: '', password: '' })).rejects.toMatchObject({
      message: 'Username and password should not be empty.',
      statusCode: 400,
    });
  });

  it(`should throw if username or password is undefined`, async () => {
    await expect(createUser.execute({})).rejects.toMatchObject({
      message: 'Something went wrong! Try again.',
      statusCode: 400,
    });
  });

  it('should return right hashed password from repository', async () => {
    const user = await createUser.execute({ username: 'Teste', password: 'Teste' });
    let passwordMatch;
    if (user.password) {
      passwordMatch = await compare('Teste', user.password);
    }

    expect(user.password).not.toBe('Teste');
    expect(passwordMatch).toBe(true);
  });

  it('should return the same username passed on execute method', async () => {
    const user = await createUser.execute({ username: 'Teste', password: 'Teste' });

    expect(user.username).toBe('Teste');
  });
});
