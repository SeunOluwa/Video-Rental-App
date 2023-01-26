import express from "express";
import { createUser } from "../controllers/user.controller";
import { validateInput } from "../middlewares/input-validator";
import { CreateUserInputSchema } from "../schemas/user.schema";

const router = express.Router();

router.post("/signup", validateInput(CreateUserInputSchema), createUser);

export default router;
