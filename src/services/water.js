import UserCollection from '../db/models/User.js';

export const setWaterRate = async (
  userId,
  payload,
  options = { new: true }
) => {

  const daylyNorm = payload.curDaylyNorm;
  const updateUser = await UserCollection.findOneAndUpdate(
    { _id: userId },
    { daylyNorm },
    { ...options },
  );

  return updateUser;
};
