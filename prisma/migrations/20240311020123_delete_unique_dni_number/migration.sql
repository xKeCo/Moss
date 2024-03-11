-- DropForeignKey
ALTER TABLE "BasicInformation" DROP CONSTRAINT "BasicInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "ContactInformation" DROP CONSTRAINT "ContactInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_patientId_fkey";

-- DropForeignKey
ALTER TABLE "HealthInformation" DROP CONSTRAINT "HealthInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalInformation" DROP CONSTRAINT "MedicalInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_patientId_fkey";

-- DropIndex
DROP INDEX "Patient_dniNumber_key";

-- AddForeignKey
ALTER TABLE "BasicInformation" ADD CONSTRAINT "BasicInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInformation" ADD CONSTRAINT "ContactInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalInformation" ADD CONSTRAINT "MedicalInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInformation" ADD CONSTRAINT "HealthInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
