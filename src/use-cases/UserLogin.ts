import { UserRepository } from '../repository/prismaRepository/UserRepository';
import { compare } from 'bcrypt';
import { User } from '../interface/IUser';
import jwt from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';

interface UserLoginRequest {
  username: string;
  password: string;
}
const userRepository = new UserRepository();

class UserLogin {
  async execute(request: UserLoginRequest): Promise<{ user: Partial<User>; jwtToken: string }> {
    const { username, password } = request;

    const user = await userRepository.getByUsername({ username });

    if (user?.hashedPassword) {
      const passwordMatch = await compare(password, user.hashedPassword);

      if (!passwordMatch) {
        throw new AppError('Email or password is incorrect!');
      }
    }

    if (!user) {
      throw new AppError('User not found!');
    }

    const jwtToken = jwt.sign({ username, password }, config.jwtSecret, { expiresIn: '8h' });

    return { user, jwtToken };
  }
}

export { UserLogin };
