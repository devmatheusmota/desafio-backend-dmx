/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repository/prismaRepository/UserRepository';

interface Payload {
  username: string;
  password: string;
}

export async function ensureAuthenticated(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { username } = verify(token, config.jwtSecret) as Payload;

    const userRepository = new UserRepository();

    const user = await userRepository.getByUsername({ username });

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }
    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
