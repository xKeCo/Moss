/*
  Warnings:

  - You are about to drop the column `totlaPaid` on the `Treatment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "totlaPaid",
ADD COLUMN     "totalPaid" DOUBLE PRECISION NOT NULL DEFAULT 0;
