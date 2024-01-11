/*
  Warnings:

  - You are about to drop the `basicInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contactInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicalInformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "basicInformation" DROP CONSTRAINT "basicInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "contactInformation" DROP CONSTRAINT "contactInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "medicalInformation" DROP CONSTRAINT "medicalInformation_patientId_fkey";

-- DropTable
DROP TABLE "basicInformation";

-- DropTable
DROP TABLE "contactInformation";

-- DropTable
DROP TABLE "medicalInformation";

-- CreateTable
CREATE TABLE "BasicInformation" (
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

    CONSTRAINT "BasicInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInformation" (
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

    CONSTRAINT "ContactInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalInformation" (
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

    CONSTRAINT "MedicalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BasicInformation_patientId_key" ON "BasicInformation"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInformation_patientId_key" ON "ContactInformation"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalInformation_patientId_key" ON "MedicalInformation"("patientId");

-- AddForeignKey
ALTER TABLE "BasicInformation" ADD CONSTRAINT "BasicInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInformation" ADD CONSTRAINT "ContactInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalInformation" ADD CONSTRAINT "MedicalInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
