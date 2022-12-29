import { Request, Response } from 'express';
import { User } from '../interface/IUser';
import { UserRepository } from '../repository/prismaRepository/UserRepository';
import { CreateUser } from '../use-cases/CreateUser';
import { UserLogin } from '../use-cases/UserLogin';

const repository = new UserRepository();
const createUser = new CreateUser(repository);
const userLogin = new UserLogin(repository);

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { username, password }: User = req.body;

    try {
      const user = await createUser.execute({ username, password });
      if (!user) {
        return res.status(400).json({ message: 'User has not been created! Try again.' });
      }
      return res.status(201).json({ message: 'User has been created.', user });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { username, password }: User = req.body;

    try {
      const { user, jwtToken } = await userLogin.execute({ username, password });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed! Try again.' });
      }
      return res.status(200).json({ message: 'Login completed.', user: user.username, jwtToken });
    } catch (error) {
      return res.status(401).json({ error: error });
    }
  }
}

export { UserController };
