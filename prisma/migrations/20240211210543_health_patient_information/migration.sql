-- CreateEnum
CREATE TYPE "HabitsType" AS ENUM ('Saludables', 'SuccionLingual', 'SuccionDigital', 'Onicofagia', 'Bruxismo', 'Tabaco', 'ModerObjetos', 'Otros');

-- CreateEnum
CREATE TYPE "TeethType" AS ENUM ('Temporales', 'Mixto', 'Permanentes', 'EdentuloTotal', 'EdentuloParcial', 'Agenesias', 'Anodoncia');

-- CreateEnum
CREATE TYPE "TongueType" AS ENUM ('SinAlteraciones', 'Bifida', 'Geografica', 'Fisurada', 'Macroglosia', 'Microglosia', 'Pliegues', 'Frenillos', 'Ulceras', 'Quemaduras', 'Mordeduras', 'Tumores', 'Crecimiento', 'Atrofia', 'Hipertrofia');

-- CreateEnum
CREATE TYPE "ATMType" AS ENUM ('SinAlteraciones', 'Brinco', 'Subluxacion', 'Luxacion', 'Retrodisquitis', 'Sinovitis', 'Artrosis', 'Anquilosis', 'Fractura', 'Tumores', 'Crecimiento', 'Atrofia', 'Hipertrofia');

-- CreateEnum
CREATE TYPE "SalivaryGlandsType" AS ENUM ('SinAlteraciones', 'Sialorrea', 'Xerostomia', 'Sialolitiasis', 'Sialoadenitis', 'Tumores', 'Crecimiento', 'Atrofia', 'Hipertrofia', 'Fistulas', 'Quistes', 'Sialocele', 'Ranula', 'Mucocele', 'Sialadenosis', 'Sialosis');

-- CreateEnum
CREATE TYPE "OcclusionType" AS ENUM ('ClaseI', 'ClaseII', 'ClaseIII', 'MordidaAbierta', 'MordidaCruzada', 'MordidaProfunda', 'Organica', 'EnGrupo', 'BilateralBalanceada');

-- CreateEnum
CREATE TYPE "PainThresholdType" AS ENUM ('Normal', 'Hipersensibilidad', 'Hiposensibilidad', 'Anestesia', 'Parestesia', 'Alto', 'Bajo');

-- CreateEnum
CREATE TYPE "JointSoundsType" AS ENUM ('SinAlteraciones', 'Click', 'Brinco', 'Crepitacion');

-- CreateTable
CREATE TABLE "SystemReview" (
    "id" TEXT NOT NULL,
    "head" TEXT,
    "neck" TEXT,
    "genitourinary" TEXT,
    "eyes" TEXT,
    "cardiovascular" TEXT,
    "locomotor" TEXT,
    "ORL" TEXT,
    "respiratory" TEXT,
    "skin" TEXT,
    "stomological" TEXT,
    "gastrointestinal" TEXT,
    "circulatory" TEXT,
    "HealthInformationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyBackground" (
    "id" TEXT NOT NULL,
    "diabetes" BOOLEAN NOT NULL DEFAULT false,
    "familyDiabetes" TEXT,
    "cancer" BOOLEAN NOT NULL DEFAULT false,
    "familyCancer" TEXT,
    "leukemia" BOOLEAN NOT NULL DEFAULT false,
    "familyLeukemia" TEXT,
    "heartDisease" BOOLEAN NOT NULL DEFAULT false,
    "familyHeartDisease" TEXT,
    "hypertension" BOOLEAN NOT NULL DEFAULT false,
    "familyHypertension" TEXT,
    "others" TEXT NOT NULL,
    "HealthInformationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FamilyBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalBackground" (
    "id" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "habits" "HabitsType" NOT NULL DEFAULT 'Saludables',
    "habitsDescription" TEXT,
    "diseases" TEXT NOT NULL,
    "diabetes" BOOLEAN NOT NULL DEFAULT false,
    "cancer" BOOLEAN NOT NULL DEFAULT false,
    "leukemia" BOOLEAN NOT NULL DEFAULT false,
    "heartDisease" BOOLEAN NOT NULL DEFAULT false,
    "surgeries" BOOLEAN NOT NULL DEFAULT false,
    "surgeriesDescription" TEXT,
    "hospitalization" BOOLEAN NOT NULL DEFAULT false,
    "psychological" BOOLEAN NOT NULL DEFAULT false,
    "hypertension" BOOLEAN NOT NULL DEFAULT false,
    "others" TEXT NOT NULL,
    "HealthInformationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OralSystemReview" (
    "id" TEXT NOT NULL,
    "faneras" TEXT NOT NULL,
    "oralCavity" TEXT NOT NULL,
    "teeth" "TeethType" NOT NULL DEFAULT 'Permanentes',
    "tongue" "TongueType" NOT NULL DEFAULT 'SinAlteraciones',
    "ATMLeft" "ATMType" NOT NULL DEFAULT 'SinAlteraciones',
    "ATMRight" "ATMType" NOT NULL DEFAULT 'SinAlteraciones',
    "salivaryGlands" "SalivaryGlandsType" NOT NULL DEFAULT 'SinAlteraciones',
    "occlusion" "OcclusionType" NOT NULL DEFAULT 'ClaseI',
    "teethColor" TEXT NOT NULL,
    "painThreshold" "PainThresholdType" NOT NULL DEFAULT 'Normal',
    "maxMandibularOpening" TEXT NOT NULL,
    "leftLaterality" TEXT NOT NULL,
    "rightLaterality" TEXT NOT NULL,
    "protrusion" TEXT NOT NULL,
    "jointSounds" "JointSoundsType" NOT NULL DEFAULT 'SinAlteraciones',
    "HealthInformationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OralSystemReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthInformation" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemReview_HealthInformationId_key" ON "SystemReview"("HealthInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyBackground_HealthInformationId_key" ON "FamilyBackground"("HealthInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalBackground_HealthInformationId_key" ON "PersonalBackground"("HealthInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "OralSystemReview_HealthInformationId_key" ON "OralSystemReview"("HealthInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInformation_patientId_key" ON "HealthInformation"("patientId");

-- AddForeignKey
ALTER TABLE "SystemReview" ADD CONSTRAINT "SystemReview_HealthInformationId_fkey" FOREIGN KEY ("HealthInformationId") REFERENCES "HealthInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyBackground" ADD CONSTRAINT "FamilyBackground_HealthInformationId_fkey" FOREIGN KEY ("HealthInformationId") REFERENCES "HealthInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBackground" ADD CONSTRAINT "PersonalBackground_HealthInformationId_fkey" FOREIGN KEY ("HealthInformationId") REFERENCES "HealthInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OralSystemReview" ADD CONSTRAINT "OralSystemReview_HealthInformationId_fkey" FOREIGN KEY ("HealthInformationId") REFERENCES "HealthInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInformation" ADD CONSTRAINT "HealthInformation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("dniNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
