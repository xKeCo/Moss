/*
  Warnings:

  - Added the required column `endTimeAMPM` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTimeAMPM` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "endTimeAMPM" TEXT NOT NULL,
ADD COLUMN     "startTimeAMPM" TEXT NOT NULL;
