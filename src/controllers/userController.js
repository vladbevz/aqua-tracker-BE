import bcrypt from 'bcrypt';
import UserCollection from '../db/models/User.js';
import createHttpError from 'http-errors';

export const getCurrent = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserCollection.findById(userId);
    if (!user) {
      return res.status(401).send('Not authorized');
    }
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        avatarUrl: user.avatarUrl,
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
