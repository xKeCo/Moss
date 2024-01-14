/*
  Warnings:

  - A unique constraint covering the columns `[treatmentId]` on the table `RealTxPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tooth_initialOdontogramId_key";

-- CreateIndex
CREATE UNIQUE INDEX "RealTxPlan_treatmentId_key" ON "RealTxPlan"("treatmentId");
