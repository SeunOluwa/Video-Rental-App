import express from "express";
import { createVideo, getVideos } from "../controllers/video.controller";
import { validateInput } from "../middlewares/input-validator";
import { CreateVideoInputSchema } from "../schemas/video.schema";

const router = express.Router();

router.get("/", getVideos);

router.post("/upload", validateInput(CreateVideoInputSchema), createVideo);

export default router;
