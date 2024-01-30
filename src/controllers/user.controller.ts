import { Request, Response } from "express";
import prisma from "../services/prisma";
import { CreateUserInputType } from "../schemas/user.schema";
import { hashContent } from "../services/hash";
import { JWTPayload } from "../services/jwt";
import { createAccessToken } from "../services/jwt";

export const createUser = async (
  req: Request<{}, {}, CreateUserInputType["body"]>,
  res: Response
) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await hashContent(password);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  const payloadData: JWTPayload = {
    id: user.id,
    email: user.email,
  };
  const accessToken: string = createAccessToken(payloadData);

  return res.status(201).json({ accessToken });
};
