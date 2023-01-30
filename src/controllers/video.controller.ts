import { Request, Response } from "express";
import prisma from "../services/prisma";
import {
  CreateVideoInputType,
  RentVideoInputType,
} from "../schemas/video.schema";
import { NotFound } from "../utils/custom-errors";
import { JWTUser } from "../services/jwt";

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

export const rentVideo = async (
  req: Request<{ id: string }, {}, RentVideoInputType["body"]>,
  res: Response<any, JWTUser>
) => {
  const { id } = req.params;
  const { id: userId } = res.locals.user;
  const { noOfDays } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const video = await prisma.video.findUnique({ where: { id } });
  const price = await prisma.price.findUnique({ where: { videoId: id } });

  let videoPrice;
  if (user && video && price) {
    if (video.type === "regular" && price.regular) {
      videoPrice = price.regular * noOfDays;
    } else if (
      video.type === "children_movie" &&
      price.childrenMovie &&
      video.maxAge
    ) {
      videoPrice = price.childrenMovie * noOfDays + video.maxAge / 2;
    } else if (
      video.type === "new_release" &&
      price.newRelease &&
      video.yearReleased
    ) {
      videoPrice = video.yearReleased - price.newRelease * noOfDays;
    }
  } else {
    throw new NotFound("User or Video or Price not found");
  }

  await prisma.rent.create({
    data: {
      userName: `${user.firstName} ${user.lastName}`,
      videoTitle: video.title,
      noOfDays,
      userId,
      videoId: id,
    },
  });

  return res.status(201).json({ videoPrice });
};
