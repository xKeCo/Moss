/*
  Warnings:

  - Made the column `emailSent` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `SMSsent` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `WhatsAppSent` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "emailSent" SET NOT NULL,
ALTER COLUMN "SMSsent" SET NOT NULL,
ALTER COLUMN "WhatsAppSent" SET NOT NULL;
