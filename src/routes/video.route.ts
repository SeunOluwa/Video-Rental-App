import express from "express";
import {
  createVideo,
  getVideoPrice,
  getVideos,
  rentVideo,
} from "../controllers/video.controller";
import { validateInput } from "../middlewares/input-validator";
import {
  CreateVideoInputSchema,
  RentVideoInputSchema,
} from "../schemas/video.schema";

import { auth } from "../middlewares/auth-handler";

const router = express.Router();

router.get("/", getVideos);
router.get("/:id/price", getVideoPrice);

router.post(
  "/upload",
  auth,
  validateInput(CreateVideoInputSchema),
  createVideo
);
router.post("/:id/rent", auth, validateInput(RentVideoInputSchema), rentVideo);

export default router;
