/*
  Warnings:

  - You are about to drop the column `HealthInformationId` on the `OralSystemReview` table. All the data in the column will be lost.
  - You are about to drop the column `HealthInformationId` on the `PersonalBackground` table. All the data in the column will be lost.
  - You are about to drop the column `HealthInformationId` on the `SystemReview` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[healthInformationId]` on the table `OralSystemReview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[healthInformationId]` on the table `PersonalBackground` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[healthInformationId]` on the table `SystemReview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `healthInformationId` to the `OralSystemReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthInformationId` to the `PersonalBackground` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthInformationId` to the `SystemReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OralSystemReview" DROP CONSTRAINT "OralSystemReview_HealthInformationId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBackground" DROP CONSTRAINT "PersonalBackground_HealthInformationId_fkey";

-- DropForeignKey
ALTER TABLE "SystemReview" DROP CONSTRAINT "SystemReview_HealthInformationId_fkey";

-- DropIndex
DROP INDEX "OralSystemReview_HealthInformationId_key";

-- DropIndex
DROP INDEX "PersonalBackground_HealthInformationId_key";

-- DropIndex
DROP INDEX "SystemReview_HealthInformationId_key";

-- AlterTable
ALTER TABLE "OralSystemReview" DROP COLUMN "HealthInformationId",
ADD COLUMN     "healthInformationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalBackground" DROP COLUMN "HealthInformationId",
ADD COLUMN     "healthInformationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SystemReview" DROP COLUMN "HealthInformationId",
ADD COLUMN     "healthInformationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OralSystemReview_healthInformationId_key" ON "OralSystemReview"("healthInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalBackground_healthInformationId_key" ON "PersonalBackground"("healthInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "SystemReview_healthInformationId_key" ON "SystemReview"("healthInformationId");

-- AddForeignKey
ALTER TABLE "SystemReview" ADD CONSTRAINT "SystemReview_healthInformationId_fkey" FOREIGN KEY ("healthInformationId") REFERENCES "HealthInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBackground" ADD CONSTRAINT "PersonalBackground_healthInformationId_fkey" FOREIGN KEY ("healthInformationId") REFERENCES "HealthInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OralSystemReview" ADD CONSTRAINT "OralSystemReview_healthInformationId_fkey" FOREIGN KEY ("healthInformationId") REFERENCES "HealthInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
