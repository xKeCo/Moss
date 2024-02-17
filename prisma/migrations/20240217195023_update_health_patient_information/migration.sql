/*
  Warnings:

  - The `others` column on the `FamilyBackground` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allergies` column on the `PersonalBackground` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `medications` column on the `PersonalBackground` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `others` column on the `PersonalBackground` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `head` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `neck` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genitourinary` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eyes` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cardiovascular` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locomotor` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ORL` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `respiratory` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `skin` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stomological` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gastrointestinal` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `circulatory` on table `SystemReview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FamilyBackground" ADD COLUMN     "familyOthers" TEXT,
DROP COLUMN "others",
ADD COLUMN     "others" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PersonalBackground" ADD COLUMN     "othersDescription" TEXT,
DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[] DEFAULT ARRAY['No hay alergias']::TEXT[],
DROP COLUMN "medications",
ADD COLUMN     "medications" TEXT[] DEFAULT ARRAY['No hay medicamentos']::TEXT[],
DROP COLUMN "others",
ADD COLUMN     "others" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SystemReview" ALTER COLUMN "head" SET NOT NULL,
ALTER COLUMN "head" SET DEFAULT 'Sano',
ALTER COLUMN "neck" SET NOT NULL,
ALTER COLUMN "neck" SET DEFAULT 'Sano',
ALTER COLUMN "genitourinary" SET NOT NULL,
ALTER COLUMN "genitourinary" SET DEFAULT 'Sano',
ALTER COLUMN "eyes" SET NOT NULL,
ALTER COLUMN "eyes" SET DEFAULT 'Sano',
ALTER COLUMN "cardiovascular" SET NOT NULL,
ALTER COLUMN "cardiovascular" SET DEFAULT 'Sano',
ALTER COLUMN "locomotor" SET NOT NULL,
ALTER COLUMN "locomotor" SET DEFAULT 'Sano',
ALTER COLUMN "ORL" SET NOT NULL,
ALTER COLUMN "ORL" SET DEFAULT 'Sano',
ALTER COLUMN "respiratory" SET NOT NULL,
ALTER COLUMN "respiratory" SET DEFAULT 'Sano',
ALTER COLUMN "skin" SET NOT NULL,
ALTER COLUMN "skin" SET DEFAULT 'Sano',
ALTER COLUMN "stomological" SET NOT NULL,
ALTER COLUMN "stomological" SET DEFAULT 'Sano',
ALTER COLUMN "gastrointestinal" SET NOT NULL,
ALTER COLUMN "gastrointestinal" SET DEFAULT 'Sano',
ALTER COLUMN "circulatory" SET NOT NULL,
ALTER COLUMN "circulatory" SET DEFAULT 'Sano';
