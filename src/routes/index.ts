import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";

const mainRouter = Router();

mainRouter.use("/users", userRoute);
mainRouter.use("/auth", authRoute);

export default mainRouter;
