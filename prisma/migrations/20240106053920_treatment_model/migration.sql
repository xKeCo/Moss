/*
  Warnings:

  - You are about to drop the column `basicInformationId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `contactInformationId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `medicalInformationId` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[patientId]` on the table `BasicInformation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `ContactInformation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `MedicalInformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientId` to the `BasicInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `ContactInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `MedicalInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_basicInformationId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_contactInformationId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_medicalInformationId_fkey";

-- DropIndex
DROP INDEX "Patient_basicInformationId_key";

-- DropIndex
DROP INDEX "Patient_contactInformationId_key";

-- DropIndex
DROP INDEX "Patient_medicalInformationId_key";

-- AlterTable
ALTER TABLE "BasicInformation" ADD COLUMN     "patientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContactInformation" ADD COLUMN     "patientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MedicalInformation" ADD COLUMN     "patientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "basicInformationId",
DROP COLUMN "contactInformationId",
DROP COLUMN "medicalInformationId";

-- CreateTable
CREATE TABLE "Cavities" (
    "id" TEXT NOT NULL,
    "center" INTEGER NOT NULL,
    "top" INTEGER NOT NULL,
    "bottom" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "right" INTEGER NOT NULL,
    "initialOdontogramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cavities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitialOdontogram" (
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
    "treatmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InitialOdontogram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realTxPlan" (
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

    CONSTRAINT "realTxPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "txEvolution" (
    "id" TEXT NOT NULL,
    "txEvolDate" TEXT NOT NULL,
    "txEvolDesc" TEXT NOT NULL,
    "txEvolDoc" TEXT NOT NULL,
    "txEvolPayment" TEXT NOT NULL,
    "txEvolActive" BOOLEAN DEFAULT true,
    "treatmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "txEvolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment" (
    "id" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "prognosis" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totlaPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPending" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "treatment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cavities_initialOdontogramId_key" ON "Cavities"("initialOdontogramId");

-- CreateIndex
CREATE UNIQUE INDEX "InitialOdontogram_treatmentId_key" ON "InitialOdontogram"("treatmentId");

-- CreateIndex
CREATE UNIQUE INDEX "realTxPlan_treatmentId_key" ON "realTxPlan"("treatmentId");

-- CreateIndex
CREATE UNIQUE INDEX "txEvolution_treatmentId_key" ON "txEvolution"("treatmentId");

-- CreateIndex
CREATE UNIQUE INDEX "treatment_patientId_key" ON "treatment"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "BasicInformation_patientId_key" ON "BasicInformation"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInformation_patientId_key" ON "ContactInformation"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalInformation_patientId_key" ON "MedicalInformation"("patientId");

-- AddForeignKey
ALTER TABLE "BasicInformation" ADD CONSTRAINT "BasicInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInformation" ADD CONSTRAINT "ContactInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalInformation" ADD CONSTRAINT "MedicalInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cavities" ADD CONSTRAINT "Cavities_initialOdontogramId_fkey" FOREIGN KEY ("initialOdontogramId") REFERENCES "InitialOdontogram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitialOdontogram" ADD CONSTRAINT "InitialOdontogram_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realTxPlan" ADD CONSTRAINT "realTxPlan_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "txEvolution" ADD CONSTRAINT "txEvolution_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
