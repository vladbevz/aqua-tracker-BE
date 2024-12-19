import bcrypt from 'bcrypt';
import UserCollection from '../db/models/User.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getCurrent = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserCollection.findById(userId);
    if (!user) {
      return res.status(401).send('Not authorized');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully find user',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          daylyNorm: user.daylyNorm,
          gender: user.gender,
          avatarUrl: user.avatarUrl,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSettings = async (req, res) => {
  const { outdatedPassword, newPassword, newEmail } = req.body;
  const { _id, currentEmail, password } = req.user;
  let hashedNewPassword;
  let avatarUrl;
  const photo = req.file;

  if (photo) {
    avatarUrl = await saveFileToCloudinary(photo);
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
  if (avatarUrl) {
    updatedUserData.avatarUrl = avatarUrl;
  }

  const updatedUser = await UserCollection.findByIdAndUpdate(
    _id,
    updatedUserData,
    {
      new: true,
    },
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully update data',
    data: {
      user: updatedUser,
    },
  });
};

export const updateWaterRateController = async (req, res, next) => {
  try {
    const { daylyNorm } = req.body;

    if (!daylyNorm || typeof daylyNorm !== 'number' || daylyNorm <= 0) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid daily water norm. It must be a positive number.',
      });
    }

    const updatedUserData = { daylyNorm };
    const { _id } = req.user;

    const updatedUser = await UserCollection.findByIdAndUpdate(
      _id,
      updatedUserData,
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated daily water norm',
      data: {
        daylyNorm: updatedUser.daylyNorm,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const updateUserAvatarController = async (req, res, next) => {
  try {
    let avatarUrl;
    const photo = req.file;

    if (photo) {
      avatarUrl = await saveFileToCloudinary(photo);
    }

    const updatedUserData = { ...req.body };
    if (avatarUrl) {
      updatedUserData.avatarUrl = avatarUrl;
    }
    const { _id } = req.user;
    const updatedUser = await UserCollection.findByIdAndUpdate(
      _id,
      updatedUserData,
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully updated user avatar',
      data: {
        avatarUrl: updatedUser.avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
