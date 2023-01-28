import express from "express";
import { createVideo } from "../controllers/video.controller";
import { validateInput } from "../middlewares/input-validator";
import { CreateVideoInputSchema } from "../schemas/video.schema";

const router = express.Router();

router.post("/upload", validateInput(CreateVideoInputSchema), createVideo);

export default router;
