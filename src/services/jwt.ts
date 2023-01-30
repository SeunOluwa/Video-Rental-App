import jwt from "jsonwebtoken";
import config from "../config/settings";

export interface JWTPayload {
  id: string;
  email: string;
}

export interface JWTUser {
  user: JWTPayload;
}

export const createAccessToken = (payload: JWTPayload): string => {
  const token: string = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

export const decodeAccessToken = (token: string): JWTPayload => {
  const { id, email } = jwt.verify(
    token,
    config.JWT_ACCESS_SECRET
  ) as jwt.JwtPayload & JWTPayload;
  return { id, email };
};
