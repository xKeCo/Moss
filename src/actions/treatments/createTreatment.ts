'use server';
import prisma from '@/lib/prisma';

export const createTreatment = async (treatmentData: any, patientID: string) => {
  try {
    const totalPrice = treatmentData.realTxPlan.reduce(
      (acc: number, curr: any) => acc + Number(curr.txPrice),
      0
    );

    const totalPaid = treatmentData.txEvolutions.reduce(
      (acc: number, curr: any) => acc + Number(curr.txEvolPayment),
      0
    );

    const totalPending = totalPrice - totalPaid;

    const newTreatment = await prisma.treatment.create({
      data: {
        diagnosis: treatmentData.diagnosis,
        prognosis: treatmentData.prognosis,
        patientId: patientID,
        RealTxPlan: {
          createMany: {
            data: treatmentData.realTxPlan,
          },
        },
        TxEvolutions: {
          createMany: {
            data: treatmentData.txEvolutions,
          },
        },
        InitialOdontogram: {
          create: {
            Tooth: {
              createMany: {
                data: treatmentData.InitialOdontogram,
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
      },
    });

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
