import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { userRegisterSchema, userLoginSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/signup',
  validateBody(userRegisterSchema),
  ctrlWrapper(userController.registerController),
);

router.post(
  '/signin',
  validateBody(userLoginSchema),
  ctrlWrapper(userController.loginController),
);

router.post('/logout', userController.logoutUser);

export default router;
