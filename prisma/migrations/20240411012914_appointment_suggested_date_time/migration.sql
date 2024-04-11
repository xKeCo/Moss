-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "suggestedDate" TIMESTAMP(3),
ADD COLUMN     "suggestedEndTime" TEXT,
ADD COLUMN     "suggestedEndTimeAMPM" TEXT,
ADD COLUMN     "suggestedStartTime" TEXT,
ADD COLUMN     "suggestedStartTimeAMPM" TEXT;
