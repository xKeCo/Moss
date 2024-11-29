'use server';
import prisma from '@/lib/prisma';

export const createPatient = async (patientData: any, workspaceID: string) => {
  try {
    const existingPatient = await prisma.patient.findFirst({
      where: {
        dniNumber: patientData.dniNumber,
        workspaceId: workspaceID,
      },
    });

    if (existingPatient) {
      return {
        ok: false,
        errorMessage:
          'A patient with that dni number already exists. Please select another dni number.',
        error: 'patientExists',
      };
    }

    const { BasicInformation, ContactInformation, MedicalInformation } = patientData;

    const newPatient = await prisma.patient.create({
      data: {
        dniNumber: patientData.dniNumber,
        email: patientData.email,
        name: patientData.name,
        photoURL: `https://avatar.vercel.sh/${workspaceID}${patientData.dniNumber}`,
        workspaceId: workspaceID,
        currentIllness: patientData.currentIllness,
        reasonForConsultation: patientData.reasonForConsultation,
        BasicInformation: {
          create: {
            ...BasicInformation,
          },
        },
        ContactInformation: {
          create: {
            ...ContactInformation,
          },
        },
        MedicalInformation: {
          create: {
            ...MedicalInformation,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return {
      ok: true,
      patient: newPatient,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'Could not create patient. Please try again.',
      error: 'unknownError',
    };
  }
};
