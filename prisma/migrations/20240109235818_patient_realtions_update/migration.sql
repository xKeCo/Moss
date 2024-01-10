-- DropForeignKey
ALTER TABLE "BasicInformation" DROP CONSTRAINT "BasicInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "ContactInformation" DROP CONSTRAINT "ContactInformation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalInformation" DROP CONSTRAINT "MedicalInformation_patientId_fkey";

-- AddForeignKey
ALTER TABLE "BasicInformation" ADD CONSTRAINT "BasicInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInformation" ADD CONSTRAINT "ContactInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalInformation" ADD CONSTRAINT "MedicalInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
