import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config/settings";
import mainRouter from "./routes";
import routerNotFound from "./middlewares/router-not-found";
import errorHandler from "./middlewares/error-handler";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("App is live!");
});

app.use("/api/v1", mainRouter);

app.use(routerNotFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  if (config.NODE_ENV === "development") {
    console.log(`App running on http://127.0.0.1:${config.PORT}`);
  } else {
    console.log("App is running");
  }
});
