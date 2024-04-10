'use server';
import prisma from '@/lib/prisma';
import type { IRealTxPlan, ITxEvolution } from '@/interfaces';
import { revalidatePath } from 'next/cache';

interface IUpdateTreatment {
  RealTxPlan: IRealTxPlan[];
  TxEvolutions: ITxEvolution[];
  id: string;
  diagnosis: string;
  prognosis: string;
  patientId: string;
  createdAt: string | Date;
}

export const updateTreatment = async (
  treatmentData: IUpdateTreatment,
  treatmentId: string,
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

    const realTxPlans = treatmentData.RealTxPlan.map((txPlan: any) => {
      const { treatmentId, ...txPlanWithoutTreatmentId } = txPlan;
      return txPlanWithoutTreatmentId;
    });

    const txEvolutions = treatmentData.TxEvolutions.map((txEvolution: any) => {
      const { treatmentId, ...txEvolutionWithoutTreatmentId } = txEvolution;
      return txEvolutionWithoutTreatmentId;
    });

    const updatedTreatment = await prisma.treatment.update({
      where: { id: treatmentId },
      data: {
        RealTxPlan: {
          createMany: {
            data: realTxPlans,
            skipDuplicates: true,
          },
        },
        TxEvolutions: {
          createMany: {
            data: txEvolutions,
            skipDuplicates: true,
          },
        },
        totalPrice,
        totalPaid,
        totalPending,
      },
      include: {
        Patient: true,
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
      },
    });

    revalidatePath(validatePath);

    return {
      ok: true,
      updatedTreatment,
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
