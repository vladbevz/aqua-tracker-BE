import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userInfoUpdatedSchema } from '../validation/user.js';
import { getCurrentUser, logoutUser } from '../controllers/userController.js';

import { userRegisterSchema, userLoginSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const userRouter = express.Router();

userRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(userController.registerController),
);

userRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(userController.loginController),
);

userRouter.get('/current', authenticate, getCurrentUser);

userRouter.patch(
  '/edit',
  authenticate,
  upload.single('avatar'),
  validateBody(userInfoUpdatedSchema),
  userController.updateUserSettings,
);

userRouter.post('/logout', logoutUser);

export default userRouter;
