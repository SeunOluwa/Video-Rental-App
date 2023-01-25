"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const settings_1 = __importDefault(require("./config/settings"));
// import mainRouter from "./routes";
const router_not_found_1 = __importDefault(require("./middlewares/router-not-found"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.get("/", (req, res) => {
    res.send("App is live!");
});
// app.use("/api/v1", mainRouter);
app.use(router_not_found_1.default);
app.use(error_handler_1.default);
app.listen(settings_1.default.PORT, () => {
    if (settings_1.default.NODE_ENV === "development") {
        console.log(`App running on http://127.0.0.1:${settings_1.default.PORT}`);
    }
    else {
        console.log("App is running");
    }
});
//# sourceMappingURL=server.js.map