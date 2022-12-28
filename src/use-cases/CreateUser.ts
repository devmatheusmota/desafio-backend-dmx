import { UserRepository } from '../repository/prismaRepository/UserRepository';
import { User } from '../interface/IUser';
import { AppError } from '../errors/AppError';

interface CreateUserRequest {
  username: string;
  password: string;
}

const userRepository = new UserRepository();

class CreateUser {
  async execute(request: CreateUserRequest): Promise<Partial<User>> {
    const { username, password } = request;

    const user = await userRepository.create({ username, password });

    if (!user) {
      throw new AppError('Something went wrong! Try again.');
    }

    return user;
  }
}

export { CreateUser };
