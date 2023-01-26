import { NextFunction, Request, Response } from "express";
import { JWTPayload } from "../services/jwt";
import { Unauthenticated } from "../utils/custom-errors";
import { decodeAccessToken } from "../services/jwt";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new Unauthenticated("Cannot authenticate user");
  }
  const token: string = authorization.split(" ")[1];
  try {
    const payload: JWTPayload = decodeAccessToken(token);
    res.locals.user = payload;
    return next();
  } catch (error) {
    throw new Unauthenticated("Cannot authenticate user");
  }
};
