import bcrypt from 'bcrypt';
import UserCollection from '../db/models/User.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import createHttpError from 'http-errors';
import * as userServices from '../services/user.js';
import { accessTokenLifetime } from '../constants/users.js';

const get = async (req, res) => {
  console.log(req.user);
  const { name, email, gender, avatarURL } = req.user;
  res.json({ name, email, gender, avatarURL });
};

const updateSettings = async (req, res) => {
  const { outdatedPassword, newPassword, newEmail } = req.body;
  const { _id, currentEmail, password } = req.user;

  let hashedNewPassword;
  let avatarURL;

  if (req.file) {
    avatarURL = req.file.path;
  } else {
    const keys = Object.keys(req.body);
    if (!keys.length) {
      throw createHttpError(400, 'Body must have at least one field');
    }
  }

  if (outdatedPassword && newPassword) {
    if (outdatedPassword === newPassword) {
      throw createHttpError(
        400,
        'The new password must be different from the old one',
      );
    }

    const comparedPassword = await bcrypt.compare(outdatedPassword, password);

    if (!comparedPassword) {
      throw createHttpError(401, 'Current password is incorrect');
    }

    hashedNewPassword = await bcrypt.hash(newPassword, 10);
  } else if (newPassword) {
    throw createHttpError(
      400,
      'To change the password, provide both outdatedPassword and newPassword',
    );
  }

  if (newEmail && newEmail !== currentEmail) {
    const userWithNewEmail = await UserCollection.findOne({ email: newEmail });

    if (userWithNewEmail) {
      throw createHttpError(409, 'Email is already in use');
    }
  }

  const updatedUserData = { ...req.body };
  if (hashedNewPassword) {
    updatedUserData.password = hashedNewPassword;
  }
  if (avatarURL) {
    updatedUserData.avatarURL = avatarURL;
  }

  const updatedUser = await UserCollection.findByIdAndUpdate(
    _id,
    updatedUserData,
    {
      new: true,
    },
  );

  const { name = '', gender, email } = updatedUser;
  res.status(200).json({ email, name, gender, avatarURL });
};

const logout = async (req, res) => {
  res.clearCookie('accessToken');

  res.status(200).json({
    success: true,
    message: 'Successfully logged out',
  });
};

export const registerController = async (req, res) => {
  const data = await userServices.register(req.body);

  console.log('Registration payload:', req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registerd user',
    data: data,
  });
};

export const loginController = async (req, res) => {
  const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
    await userServices.login(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + accessTokenLifetime),
  });

  res.json({
    status: 200,
    message: 'Successfully login user',
    data: {
      accessToken,
    },
  });
};

export const getCurrentUser = ctrlWrapper(get);
export const updateUserSettings = ctrlWrapper(updateSettings);
export const logoutUser = ctrlWrapper(logout);
