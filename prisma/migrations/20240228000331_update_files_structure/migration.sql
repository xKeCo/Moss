/*
  Warnings:

  - Added the required column `fileKey` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "fileKey" TEXT NOT NULL;
