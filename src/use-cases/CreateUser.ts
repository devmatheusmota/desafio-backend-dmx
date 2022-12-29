import { UserRepository } from '../repository/prismaRepository/UserRepository';
import { User } from '../interface/IUser';
import { AppError } from '../errors/AppError';
import { UserInMemoryRepository } from '../repository/in-memoryRepository/UserInMemoryRepository';

interface CreateUserRequest {
  username?: string;
  password?: string;
}

class CreateUser {
  constructor(public repository: UserRepository | UserInMemoryRepository) {}
  async execute({ username, password }: CreateUserRequest): Promise<Partial<User>> {
    let user: Partial<User> | null = null;
    if (username && password) {
      user = await this.repository.create({ username, password });
    }

    if (username === '' || password === '') {
      throw new AppError('Username and password should not be empty.');
    }

    if (!user) {
      throw new AppError('Something went wrong! Try again.');
    }

    return user;
  }
}

export { CreateUser };
