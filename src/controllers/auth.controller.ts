import { Request, Response } from "express";
import prisma from "../services/prisma";
import { LoginUserInputType } from "../schemas/auth.schema";
import { compareHash } from "../services/hash";
import { Unauthenticated } from "../utils/custom-errors";
import { JWTPayload } from "../services/jwt";
import { createAccessToken } from "../services/jwt";

export const loginUser = async (
  req: Request<{}, {}, LoginUserInputType["body"]>,
  res: Response
) => {
  const { email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    throw new Unauthenticated("User does not exist");
  }
  const hashedPassword: string = existingUser.password || "";
  const isPasswordCorrect = await compareHash(password, hashedPassword);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid credentials");
  }
  const payloadData: JWTPayload = {
    id: existingUser.id,
    email: existingUser.email,
  };
  const accessToken: string = createAccessToken(payloadData);

  return res.status(200).json({ accessToken });
};
