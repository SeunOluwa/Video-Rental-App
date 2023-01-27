-- CreateEnum
CREATE TYPE "VideoType" AS ENUM ('regular', 'children_movie', 'new_release');

-- CreateEnum
CREATE TYPE "VideoGenre" AS ENUM ('action', 'drama', 'romance', 'comedy', 'horror');

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "VideoType" NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "yearReleased" INTEGER NOT NULL,
    "genre" "VideoGenre" NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "regular" INTEGER NOT NULL,
    "childrenMovie" INTEGER NOT NULL,
    "newRelease" INTEGER NOT NULL,
    "videoId" TEXT NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "videoTitle" TEXT NOT NULL,
    "noOfDays" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Price_videoId_key" ON "Price"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_userId_key" ON "Rent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_videoId_key" ON "Rent"("videoId");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
