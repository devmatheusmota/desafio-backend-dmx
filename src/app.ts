/* eslint-disable @typescript-eslint/require-await */
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import router from './routes';
import morgan from 'morgan';
import { AppError } from './errors/AppError';

export const startApp = async (): Promise<void> => {
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/', router);
  app.get('/', (_req: Request, res: Response) => {
    return res.status(200).json({
      message: "Brewery API's working.",
    });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  });

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
  });
};
