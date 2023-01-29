import { Request, Response } from "express";
import prisma from "../services/prisma";
import { CreateVideoInputType } from "../schemas/video.schema";
import { NotFound } from "../utils/custom-errors";

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

export const getVideos = async (req: Request, res: Response) => {
  const videos = await prisma.video.findMany();

  return res.status(200).json({ videos });
};

export const getVideoPrice = async (req: Request, res: Response) => {
  const { id } = req.params;

  const video = await prisma.video.findUnique({ where: { id } });
  if (!video) {
    throw new NotFound("Video not found");
  }

  const price = await prisma.price.findUnique({ where: { videoId: id } });
  if (!price) {
    throw new NotFound("Price not found");
  }

  return res.status(201).json({ price });
};
