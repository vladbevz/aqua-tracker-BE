import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { setWaterRateController } from "../controllers/water.js";
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import { setWaterDaylyNormShema } from './../validation/water.js';


const router = Router();

// use authenticate?
router.use(authenticate);

  // response controllers

  router.post(
    '/setwaterrate',
    validateBody(setWaterDaylyNormShema),
    ctrlWrapper(setWaterRateController),
  );

export default router;
