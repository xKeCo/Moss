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
        errorMessage: 'No existe información de tratamiento para este paciente.',
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
      errorMessage:
        'Hubo un error obteniendo la información del tratamiento, por favor intenta de nuevo.',
    };
  }
};
