import { Router } from "express";
import userRoute from "./user.route";

const mainRouter = Router();

mainRouter.use("/users", userRoute);

export default mainRouter;
