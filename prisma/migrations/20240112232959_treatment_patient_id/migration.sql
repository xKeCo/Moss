/*
  Warnings:

  - Added the required column `txETTUnit` to the `RealTxPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RealTxPlan" ADD COLUMN     "txETTUnit" TEXT NOT NULL;
