/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { UserController } from '../controller/userController';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post('/user/create', userController.create);
loginRouter.post('/login', userController.login);

export default loginRouter;
