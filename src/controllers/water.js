import createHttpError from 'http-errors';
import { getMonthIndex } from '../utils/date.js';
import {
  getTodayWaterList,
  getMonthWaterList,
  createWater,
  deleteWater,
  updateWater,
} from '../services/water.js';

//GET today water list
export const getTodayWaterListController = async (req, res) => {
  const userId = req.user._id;
  var today = new Date();
  const dateStart = new Date(today.setUTCHours(0, 0, 0, 0));
  const dateEnd = new Date(today.setUTCHours(23, 59, 59, 999));
  const filter = { dateStart, dateEnd, userId };

  const todayWaterList = await getTodayWaterList({
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found records!',
    data: todayWaterList,
  });
};

export const getDayWaterListController = async (req, res) => {
  const userId = req.user._id;
  const year = req.params.year;
  const month = getMonthIndex(req.params.month.toLowerCase());
  const day = req.params.day;
  const dateStart = new Date(Date.UTC(year, month, day)).setUTCHours(
    0,
    0,
    0,
    0,
  );
  const dateEnd = new Date(Date.UTC(year, month, day)).setUTCHours(
    23,
    59,
    59,
    999,
  );
  const filter = { dateStart, dateEnd, userId };

  const todayWaterList = await getTodayWaterList({
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found records!',
    data: todayWaterList,
  });
};

//POST new water
export const createWaterController = async (req, res) => {
  const userId = req.user._id;

  const dateStr = req.body.date;
  let date = new Date();
  if (dateStr) {
    date = new Date(dateStr);
  }
  let payload = { ...req.body, date, userId };
  const water = await createWater(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created a water!`,
    data: water,
  });
};

//DELETE water
export const deleteWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const userId = req.user._id;
  const water = await deleteWater(waterId, userId);

  if (!water) {
    throw createHttpError(404, 'Water not found');
  }

  res.status(204).send();
};

//PATCH water
export const patchWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const userId = req.user._id;
  let superBody = req.body;

  const result = await updateWater(waterId, superBody, userId);

  if (!result) {
    throw createHttpError(404, 'Water not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a Water!`,
    data: result.water,
  });
};

export const getMonthWaterListController = async (req, res) => {
  const userId = req.user._id;
  const year = req.params.year;
  const month = getMonthIndex(req.params.month.toLowerCase());
  const dateStart = new Date(Date.UTC(year, month, 1));
  const dateEnd = new Date(Date.UTC(year, month + 1, 0));
  const filter = { dateStart, dateEnd, userId };

  const monthWaterList = await getMonthWaterList({
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found records!',
    data: { data: monthWaterList },
  });
};
