-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "photoURL" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "photoURL" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "logoURL" DROP DEFAULT;
