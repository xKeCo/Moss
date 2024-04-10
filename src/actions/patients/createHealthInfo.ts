'use server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export const createHealthInfo = async (
  healthInfoData: any,
  allergies: any,
  medications: any,
  patientID: string,
  validatePath: string
) => {
  try {
    const { SystemReview, FamilyBackground, PersonalBackground, OralSystemReview } = healthInfoData;

    const newHealthInfo = await prisma.healthInformation.create({
      data: {
        SystemReview: {
          create: {
            ...SystemReview,
          },
        },
        FamilyBackground: {
          create: {
            ...FamilyBackground,
          },
        },
        PersonalBackground: {
          create: {
            ...PersonalBackground,
            allergies: allergies,
            medications: medications,
          },
        },
        OralSystemReview: {
          create: {
            ...OralSystemReview,
          },
        },
        patientId: patientID,
      },
      select: {
        id: true,
      },
    });

    await prisma.patient.update({
      where: {
        id: patientID,
      },
      data: {
        hasExtraInfo: true,
      },
    });

    revalidatePath(validatePath);

    return {
      ok: true,
      healthInfo: newHealthInfo,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'Could not create health information. Please try again.',
      error: 'unknownError',
    };
  }
};
