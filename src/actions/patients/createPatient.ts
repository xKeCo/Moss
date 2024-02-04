'use server';
import { IPatient } from '@/interfaces';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const createPatient = async (patientData: any) => {
  try {
    const existingPatient = await prisma.patient.findFirst({
      where: {
        dniNumber: patientData.dniNumber,
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
        photoURL: `https://source.boringavatars.com/marble/50/${patientData.dniNumber}`,
        workspaceId: cookies().get('activeWorkspace')?.value!,
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
