import { Request, Response } from "express";
import prisma from "../services/prisma";
import { CreateUserInputType } from "../schemas/user.schema";
import { hashContent } from "../services/hash";

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

  return res.status(201).json({ user });
};
