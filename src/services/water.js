import WaterCollection from '../db/models/Water.js';
import { SORT_ORDER } from '../constants/index.js';

export const getTodayWaterList = async ({
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const watersQuery = WaterCollection.find();

  if (filter.date) {
    const start = new Date(filter.date.setHours(0, 0, 0, 0));
    const end = new Date(filter.date.setHours(23, 59, 59, 999));
    watersQuery.where('date').gte(start).lte(end);
  }
  if (filter.userId) {
    watersQuery.where('userId').equals(filter.userId);
  }

  const watersCount = await WaterCollection.find()
    .merge(watersQuery)
    .countDocuments();

  const waters = await watersQuery.sort({ [sortBy]: sortOrder }).exec();

  return {
    data: waters,
    servings: watersCount,
  };
};

export const createWater = async (payload) => {
  const water = await WaterCollection.create(payload);
  return water;
};

export const deleteWater = async (waterId, userId) => {
  const water = await WaterCollection.findOneAndDelete({
    _id: waterId,
    userId: userId,
  });
  return water;
};

export const updateWater = async (waterId, payload, userId, options = {}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id: waterId, userId: userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    water: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
