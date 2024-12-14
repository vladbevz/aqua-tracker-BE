import { Router } from 'express';
import userRouter from './users.js';
import waterRouter from './water.js';
import authRouter from './auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/water', waterRouter);

export default router;
