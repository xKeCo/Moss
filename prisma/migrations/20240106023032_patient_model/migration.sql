-- CreateEnum
CREATE TYPE "DniType" AS ENUM ('CC', 'TI', 'O');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('S', 'C', 'V', 'D', 'M', 'U');

-- CreateEnum
CREATE TYPE "DoctorType" AS ENUM ('G', 'E');

-- CreateTable
CREATE TABLE "BasicInformation" (
    "id" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dniType" "DniType" NOT NULL DEFAULT 'CC',
    "dniNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoURL" TEXT DEFAULT 'https://source.boringavatars.com/marble/50/${dniNumber}',
    "basicInformationId" TEXT NOT NULL,
    "contactInformationId" TEXT NOT NULL,
    "medicalInformationId" TEXT NOT NULL,
    "termsAndConditions" BOOLEAN NOT NULL DEFAULT true,
    "hasExtraInfo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_dniNumber_key" ON "Patient"("dniNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_basicInformationId_key" ON "Patient"("basicInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_contactInformationId_key" ON "Patient"("contactInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_medicalInformationId_key" ON "Patient"("medicalInformationId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_basicInformationId_fkey" FOREIGN KEY ("basicInformationId") REFERENCES "BasicInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_contactInformationId_fkey" FOREIGN KEY ("contactInformationId") REFERENCES "ContactInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medicalInformationId_fkey" FOREIGN KEY ("medicalInformationId") REFERENCES "MedicalInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
