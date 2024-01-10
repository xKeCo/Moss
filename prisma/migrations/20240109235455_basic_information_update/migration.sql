/*
  Warnings:

  - Added the required column `occupation` to the `BasicInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BasicInformation" ADD COLUMN     "occupation" TEXT NOT NULL;
