-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_patientId_fkey";

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
