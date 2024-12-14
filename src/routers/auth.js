import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { userRegisterSchema, userLoginSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/signup',
  validateBody(userRegisterSchema),
  ctrlWrapper(authController.registerController),
);

router.post(
  '/signin',
  validateBody(userLoginSchema),
  ctrlWrapper(authController.loginController),
);

router.post('/logout', ctrlWrapper(authController.logoutController));

router.post('/refresh', ctrlWrapper(authController.refreshController));

export default router;
