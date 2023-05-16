import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import videoRoute from "./video.route";
import walletRoute from "./wallet.route";

const mainRouter = Router();

mainRouter.use("/users", userRoute);
mainRouter.use("/auth", authRoute);
mainRouter.use("/videos", videoRoute);
mainRouter.use("/wallet", walletRoute);

export default mainRouter;
