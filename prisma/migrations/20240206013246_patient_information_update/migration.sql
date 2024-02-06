-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "currentIllness" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reasonForConsultation" TEXT NOT NULL DEFAULT '';
