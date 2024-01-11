/*
  Warnings:

  - You are about to drop the `BasicInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicalInformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BasicInformation" DROP CONSTRAINT "BasicInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "ContactInformation" DROP CONSTRAINT "ContactInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalInformation" DROP CONSTRAINT "MedicalInformation_patientId_fkey";

-- DropTable
DROP TABLE "BasicInformation";

-- DropTable
DROP TABLE "ContactInformation";

-- DropTable
DROP TABLE "MedicalInformation";

-- CreateTable
CREATE TABLE "basicInformation" (
    "id" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "occupation" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basicInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contactInformation" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "emergencyContactPhone2" TEXT,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contactInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicalInformation" (
    "id" TEXT NOT NULL,
    "EPSActive" BOOLEAN NOT NULL,
    "EPSName" TEXT,
    "visitedDoctor" BOOLEAN NOT NULL,
    "doctorType" "DoctorType",
    "inTreatment" BOOLEAN NOT NULL,
    "treatmentName" TEXT,
    "boneScan" BOOLEAN NOT NULL,
    "boneScanType" TEXT,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "basicInformation_patientId_key" ON "basicInformation"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "contactInformation_patientId_key" ON "contactInformation"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "medicalInformation_patientId_key" ON "medicalInformation"("patientId");

-- AddForeignKey
ALTER TABLE "basicInformation" ADD CONSTRAINT "basicInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contactInformation" ADD CONSTRAINT "contactInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicalInformation" ADD CONSTRAINT "medicalInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
