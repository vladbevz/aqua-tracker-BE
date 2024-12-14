import { Router } from "express";
// import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
// import { setWaterShema } from "../validation/water.js";
import { setWaterRateController } from "../controllers/water.js";
import { ctrlWrapper } from './../utils/ctrlWrapper.js';


const router = Router();

// use authenticate?
waterRouter.use(authenticate);

  // response controllers

  waterRouter.post(
    '/setwaterrate',
    // validateBody(setWaterRateShema),
    ctrlWrapper(setWaterRateController)
  );

export default router;
