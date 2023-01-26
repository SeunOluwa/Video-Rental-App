"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// import { Prisma } from "@prisma/client";
const settings_1 = __importDefault(require("../config/settings"));
const custom_errors_1 = require("../utils/custom-errors");
const errorHandler = (error, req, res, next) => {
    console.log(error);
    if (error instanceof custom_errors_1.CustomHttpError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof zod_1.z.ZodError) {
        const errors = error.issues.map((err) => {
            return { path: err.path.slice(1).join("."), message: err.message };
        });
        return res.status(422).json({ errors });
    }
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === "P2002") {
    //     const fields: Array<string> = error.meta?.target as Array<string>;
    //     const messages: Array<string> = fields.map((field) => {
    //       const message = field.endsWith("Id")
    //         ? "User cannot have more than one record"
    //         : `${field} already exists`;
    //       return message;
    //     });
    //     return res.status(400).json({ message: messages.join(", ") });
    //   }
    // }
    // server errors will return the error in development
    // but "Internal Server Error" will be sent in production
    if (settings_1.default.NODE_ENV === "development") {
        return res.status(500).json({ error, message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.js.map