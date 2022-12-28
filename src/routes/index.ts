import { Router } from 'express';
import breweryRouter from './breweryRouter';
import loginRouter from './loginRouter';

const router = Router();

router.use(loginRouter);
router.use(breweryRouter);

export default router;
