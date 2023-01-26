import jwt from "jsonwebtoken";
import config from "../config/settings";

export interface JWTPayload {
  id: string;
  email: string;
}

export const createAccessToken = (payload: JWTPayload): string => {
  const token: string = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return token;
};
