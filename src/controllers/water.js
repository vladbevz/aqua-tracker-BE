import createHttpError from 'http-errors';
import { setWaterRate } from '../services/water.js';

export const setWaterRateController = async (req, res) => {
  const userId = req.user._id;

  const updateUser = setWaterRate(userId);

  if (!updateUser) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: `Successfully set water rate!`,
    data: updateUser
  });
};
