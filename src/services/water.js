import UserCollection from '../db/models/User.js';

export const setWaterRate = async (
  userId,
  payload,
  options = { new: true }
) => {
  const daylyNorm = 1500;
  const updateUser = await UserCollection.findOneAndUpdate(
    { _id: userId },
    { ...payload },
    { ...options },
  );

  return updateUser;
};
