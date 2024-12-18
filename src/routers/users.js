import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userInfoUpdatedSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const userRouter = express.Router();

userRouter.get(
  '/current',
  authenticate,
  ctrlWrapper(userController.getCurrent),
);

userRouter.patch(
  '/update',
  authenticate,
  upload.single('avatarUrl'),
  validateBody(userInfoUpdatedSchema),
  ctrlWrapper(userController.updateSettings),
);

// update dayly norm
userRouter.patch(
  '/waterRate',
  authenticate,
  validateBody(userInfoUpdatedSchema),
  ctrlWrapper(userController.updateWaterRateController),
);

// update userAvatar
userRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatarUrl'),
  validateBody(userInfoUpdatedSchema),
  ctrlWrapper(userController.updateUserAvatarController),
);

export default userRouter;
