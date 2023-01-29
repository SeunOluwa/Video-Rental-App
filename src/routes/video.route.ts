import express from "express";
import {
  createVideo,
  getVideoPrice,
  getVideos,
} from "../controllers/video.controller";
import { validateInput } from "../middlewares/input-validator";
import { CreateVideoInputSchema } from "../schemas/video.schema";

const router = express.Router();

router.get("/", getVideos);
router.get("/:id/price", getVideoPrice);

router.post("/upload", validateInput(CreateVideoInputSchema), createVideo);

export default router;
