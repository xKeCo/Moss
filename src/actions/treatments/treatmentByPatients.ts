'use server';
import prisma from '@/lib/prisma';

export const getTreatmentById = async (treatmentId: string) => {
  try {
    const treatment = await prisma.treatment.findUnique({
      where: { id: treatmentId },
      include: {
        InitialOdontogram: {
          include: {
            Tooth: {
              include: {
                cavities: true,
              },
            },
          },
        },
        RealTxPlan: true,
        TxEvolutions: true,
        Patient: true,
      },
    });

    if (!treatment) {
      return {
        ok: false,
        errorMessage: 'There is not a treatment created for this patient.',
      };
    }

    return {
      ok: true,
      treatmentInfo: treatment,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'There was an error getting the treatment, please try again.',
    };
  }
};
