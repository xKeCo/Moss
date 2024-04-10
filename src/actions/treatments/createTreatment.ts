'use server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import type { ICavities } from '@/interfaces';

export const createTreatment = async (
  treatmentData: any,
  patientID: string,
  validatePath: string
) => {
  try {
    const totalPrice = treatmentData.RealTxPlan.reduce(
      (acc: number, curr: any) => acc + Number(curr.txPrice),
      0
    );

    const totalPaid = treatmentData.TxEvolutions.reduce(
      (acc: number, curr: any) => acc + Number(curr.txEvolPayment),
      0
    );

    const totalPending = totalPrice - totalPaid;

    const onlyCavities = treatmentData.InitialOdontogram.map((tooth: any) => tooth.cavities);
    const teethWithoutCavities = treatmentData.InitialOdontogram.map((tooth: any) => {
      const { cavities, ...toothWithoutCavities } = tooth;
      return toothWithoutCavities;
    });

    const newTreatment = await prisma.treatment.create({
      data: {
        diagnosis: treatmentData.diagnosis,
        prognosis: treatmentData.prognosis,
        patientId: patientID,
        RealTxPlan: {
          createMany: {
            data: treatmentData.RealTxPlan,
          },
        },
        TxEvolutions: {
          createMany: {
            data: treatmentData.TxEvolutions,
          },
        },
        InitialOdontogram: {
          create: {
            Tooth: {
              createMany: {
                data: teethWithoutCavities,
              },
            },
          },
        },
        totalPrice,
        totalPaid,
        totalPending,
      },
      select: {
        id: true,
        InitialOdontogram: {
          select: {
            Tooth: {
              select: {
                id: true,
                tooth: true,
              },
            },
          },
        },
      },
    });

    const newCavitiesWithToothId = onlyCavities.map((cavity: ICavities, index: number) => ({
      ...cavity,
      toothId: newTreatment?.InitialOdontogram?.Tooth[index].id,
    }));

    await prisma.cavities.createMany({
      data: newCavitiesWithToothId,
    });

    revalidatePath(validatePath);

    return {
      ok: true,
      treatmentId: newTreatment,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'Something went wrong. Please try again.',
      error: 'unknownError',
    };
  }
};
