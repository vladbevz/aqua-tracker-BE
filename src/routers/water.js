import { Router } from 'express';
//import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getTodayWaterListController,
  createWaterController,
  deleteWaterController,
  patchWaterController,
  getMonthWaterListController,
} from '../controllers/water.js';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

// use authenticate?
router.use(authenticate);

// response controllers

//GET waters
router.get('/', ctrlWrapper(getTodayWaterListController));

router.get('/:year/:month', ctrlWrapper(getMonthWaterListController));

//POST new Water record
router.post('/', ctrlWrapper(createWaterController));

//DELETE
router.delete('/:waterId', isValidId, ctrlWrapper(deleteWaterController));

//PATCH
router.patch(
  '/:waterId',
  isValidId,
  //validateBody(updateWatrerSchema),
  ctrlWrapper(patchWaterController),
);

export default router;
