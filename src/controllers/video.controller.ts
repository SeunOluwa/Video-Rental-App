import { Request, Response } from "express";
import prisma from "../services/prisma";
import { CreateVideoInputType } from "../schemas/video.schema";

export const createVideo = async (
  req: Request<{}, {}, CreateVideoInputType["body"]>,
  res: Response
) => {
  const {
    title,
    type,
    maxAge,
    yearReleased,
    genre,
    regPrice,
    cdmPrice,
    nwrPrice,
  } = req.body;

  const video = await prisma.video.create({
    data: {
      title,
      type,
      maxAge,
      yearReleased,
      genre,
      price: {
        create: {
          regular: regPrice,
          childrenMovie: cdmPrice,
          newRelease: nwrPrice,
        },
      },
    },
    include: {
      price: true,
    },
  });

  return res.status(201).json({ video });
};
