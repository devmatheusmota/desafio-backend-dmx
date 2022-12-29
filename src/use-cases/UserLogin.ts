import { UserRepository } from '../repository/prismaRepository/UserRepository';
import { compare } from 'bcrypt';
import { User } from '../interface/IUser';
import jwt from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { UserInMemoryRepository } from '../repository/in-memoryRepository/UserInMemoryRepository';

interface UserLoginRequest {
  username: string;
  password: string;
}

class UserLogin {
  constructor(public repository: UserRepository | UserInMemoryRepository) {}
  async execute({ username, password }: UserLoginRequest): Promise<{ user: Partial<User>; jwtToken: string }> {
    const user = await this.repository.getByUsername({ username });

    if (user?.password) {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError('Username or password is incorrect!', 401);
      }
    }

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    const jwtToken = jwt.sign({ username, password }, config.jwtSecret, { expiresIn: '8h' });

    return { user, jwtToken };
  }
}

export { UserLogin };
