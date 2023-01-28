import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import videoRoute from "./video.route";

const mainRouter = Router();

mainRouter.use("/users", userRoute);
mainRouter.use("/auth", authRoute);
mainRouter.use("/videos", videoRoute);

export default mainRouter;
