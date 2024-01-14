/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cavities` table. All the data in the column will be lost.
  - You are about to drop the column `initialOdontogramId` on the `Cavities` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Cavities` table. All the data in the column will be lost.
  - You are about to drop the column `absent` on the `InitialOdontogram` table. All the data in the column will be lost.
  - You are about to drop the column `crown` on the `InitialOdontogram` table. All the data in the column will be lost.
  - You are about to drop the column `endodontics` on the `InitialOdontogram` table. All the data in the column will be lost.
  - You are about to drop the column `extract` on the `InitialOdontogram` table. All the data in the column will be lost.
  - You are about to drop the column `filter` on the `InitialOdontogram` table. All the data in the column will be lost.
  - You are about to drop the column `implant` on the `InitialOdontogram` table. All the data in the column will be lost.
  - You are about to drop the column `regeneration` on the `InitialOdontogram` table. All the data in the column will be lost.
  - You are about to drop the column `tooth` on the `InitialOdontogram` table. All the data in the column will be lost.
  - You are about to drop the column `unerupted` on the `InitialOdontogram` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[toothId]` on the table `Cavities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `toothId` to the `Cavities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cavities" DROP CONSTRAINT "Cavities_initialOdontogramId_fkey";

-- DropIndex
DROP INDEX "Cavities_initialOdontogramId_key";

-- AlterTable
ALTER TABLE "Cavities" DROP COLUMN "createdAt",
DROP COLUMN "initialOdontogramId",
DROP COLUMN "updatedAt",
ADD COLUMN     "toothId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InitialOdontogram" DROP COLUMN "absent",
DROP COLUMN "crown",
DROP COLUMN "endodontics",
DROP COLUMN "extract",
DROP COLUMN "filter",
DROP COLUMN "implant",
DROP COLUMN "regeneration",
DROP COLUMN "tooth",
DROP COLUMN "unerupted";

-- CreateTable
CREATE TABLE "Tooth" (
    "id" TEXT NOT NULL,
    "tooth" INTEGER NOT NULL,
    "extract" INTEGER NOT NULL,
    "absent" INTEGER NOT NULL,
    "crown" INTEGER NOT NULL,
    "endodontics" INTEGER NOT NULL,
    "filter" INTEGER NOT NULL,
    "unerupted" INTEGER NOT NULL,
    "implant" INTEGER NOT NULL,
    "regeneration" INTEGER NOT NULL,
    "initialOdontogramId" TEXT NOT NULL,

    CONSTRAINT "Tooth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tooth_initialOdontogramId_key" ON "Tooth"("initialOdontogramId");

-- CreateIndex
CREATE UNIQUE INDEX "Cavities_toothId_key" ON "Cavities"("toothId");

-- AddForeignKey
ALTER TABLE "Cavities" ADD CONSTRAINT "Cavities_toothId_fkey" FOREIGN KEY ("toothId") REFERENCES "Tooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tooth" ADD CONSTRAINT "Tooth_initialOdontogramId_fkey" FOREIGN KEY ("initialOdontogramId") REFERENCES "InitialOdontogram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
