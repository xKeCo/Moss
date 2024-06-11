/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - The required column `key` was added to the `Workspace` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_key_key" ON "Workspace"("key");
