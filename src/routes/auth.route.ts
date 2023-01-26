import express from "express";
import { LoginUserInputSchema } from "../schemas/auth.schema";
import { loginUser } from "../controllers/auth.controller";
import { validateInput } from "../middlewares/input-validator";

const router = express.Router();

router.post("/signin", validateInput(LoginUserInputSchema), loginUser);

export default router;
