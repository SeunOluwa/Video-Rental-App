import { Request, Response, NextFunction } from "express";
import { z } from "zod";
// import { Prisma } from "@prisma/client";
import config from "../config/settings";
import { CustomHttpError } from "../utils/custom-errors";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof CustomHttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof z.ZodError) {
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
  if (config.NODE_ENV === "development") {
    return res.status(500).json({ error, message: error.message });
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
