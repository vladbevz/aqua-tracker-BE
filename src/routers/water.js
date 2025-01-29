import { Router } from 'express';
//import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getTodayWaterListController,
  createWaterController,
  deleteWaterController,
  patchWaterController,
  getMonthWaterListController,
  getDayWaterListController,
} from '../controllers/water.js';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const waterRouter = Router();

// use authenticate?
waterRouter.use(authenticate);

// response controllers

//GET waters
waterRouter.get('/', ctrlWrapper(getTodayWaterListController));

waterRouter.get('/:year/:month', ctrlWrapper(getMonthWaterListController));
//
waterRouter.get('/:year/:month/:day', ctrlWrapper(getDayWaterListController));

//POST new Water record
waterRouter.post('/', ctrlWrapper(createWaterController));

//DELETE
waterRouter.delete('/:waterId', isValidId, ctrlWrapper(deleteWaterController));

//PATCH
waterRouter.patch(
  '/:waterId',
  isValidId,
  //validateBody(updateWatrerSchema),
  ctrlWrapper(patchWaterController),
);

export default waterRouter; 
