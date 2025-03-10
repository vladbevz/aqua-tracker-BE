import UserCollection from '../db/models/User.js';

export const getUserInfo = async (userId) => {
  return await UserCollection.findById(userId).select('-password -tokens');
};

export const updateUserInfo = async (userId, updates) => {
  return await UserCollection.findByIdAndUpdate(userId, updates, { new: true });
};

export const updateWaterRate = async (userId, updates) => {
  return await UserCollection.findByIdAndUpdate(userId, updates, { new: true });
};

export const updateUserAvatarUrl = async (userId, updates) => {
  return await UserCollection.findByIdAndUpdate(userId, updates, { new: true });
};
