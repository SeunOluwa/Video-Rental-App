/*
  Warnings:

  - A unique constraint covering the columns `[userId,videoId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Rent_userId_key";

-- DropIndex
DROP INDEX "Rent_videoId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Rent_userId_videoId_key" ON "Rent"("userId", "videoId");
