/*
  Warnings:

  - You are about to drop the `realTxPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treatment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `txEvolution` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workspaceId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workspaceId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InitialOdontogram" DROP CONSTRAINT "InitialOdontogram_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "realTxPlan" DROP CONSTRAINT "realTxPlan_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "txEvolution" DROP CONSTRAINT "txEvolution_treatmentId_fkey";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "realTxPlan";

-- DropTable
DROP TABLE "treatment";

-- DropTable
DROP TABLE "txEvolution";

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealTxPlan" (
    "id" TEXT NOT NULL,
    "txPhase" TEXT NOT NULL,
    "txActivity" TEXT NOT NULL,
    "txETT" TEXT NOT NULL,
    "txStartDate" TEXT NOT NULL,
    "txPrice" TEXT NOT NULL,
    "txActive" BOOLEAN DEFAULT true,
    "treatmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RealTxPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TxEvolution" (
    "id" TEXT NOT NULL,
    "txEvolDate" TEXT NOT NULL,
    "txEvolDesc" TEXT NOT NULL,
    "txEvolDoc" TEXT NOT NULL,
    "txEvolPayment" TEXT NOT NULL,
    "txEvolActive" BOOLEAN DEFAULT true,
    "treatmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TxEvolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "prognosis" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totlaPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPending" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWorkspace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_name_key" ON "Workspace"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RealTxPlan_treatmentId_key" ON "RealTxPlan"("treatmentId");

-- CreateIndex
CREATE UNIQUE INDEX "TxEvolution_treatmentId_key" ON "TxEvolution"("treatmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Treatment_patientId_key" ON "Treatment"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWorkspace_AB_unique" ON "_UserToWorkspace"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWorkspace_B_index" ON "_UserToWorkspace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_workspaceId_key" ON "Patient"("workspaceId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitialOdontogram" ADD CONSTRAINT "InitialOdontogram_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealTxPlan" ADD CONSTRAINT "RealTxPlan_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TxEvolution" ADD CONSTRAINT "TxEvolution_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkspace" ADD CONSTRAINT "_UserToWorkspace_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkspace" ADD CONSTRAINT "_UserToWorkspace_B_fkey" FOREIGN KEY ("B") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
