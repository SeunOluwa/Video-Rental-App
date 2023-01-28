/*
  Warnings:

  - You are about to alter the column `regular` on the `Price` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `childrenMovie` on the `Price` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `newRelease` on the `Price` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `noOfDays` on the `Rent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `maxAge` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `yearReleased` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Price" ALTER COLUMN "regular" SET DATA TYPE INTEGER,
ALTER COLUMN "childrenMovie" SET DATA TYPE INTEGER,
ALTER COLUMN "newRelease" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Rent" ALTER COLUMN "noOfDays" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "maxAge" SET DATA TYPE INTEGER,
ALTER COLUMN "yearReleased" SET DATA TYPE INTEGER;
